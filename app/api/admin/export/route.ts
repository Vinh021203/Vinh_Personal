import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Message from "@/models/Message";
import User from "@/models/User";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";

export const dynamic = "force-dynamic";

const collections = {
  projects: Project,
  services: Service,
  messages: Message,
  users: User,
  leads: Lead,
  activity: ActivityLog,
};

function escapeCsv(value: unknown) {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(rows: Record<string, unknown>[]) {
  const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  return [keys.map(escapeCsv).join(","), ...rows.map((row) => keys.map((key) => escapeCsv(row[key])).join(","))].join("\n");
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  await connectDB();
  const search = req.nextUrl.searchParams;
  const type = search.get("type") || "all";
  const format = search.get("format") === "csv" ? "csv" : "json";
  const picked = type === "all" ? Object.keys(collections) : [type];

  const data: Record<string, unknown[]> = {};
  for (const key of picked) {
    const model = collections[key as keyof typeof collections] as any;
    if (!model) continue;
    const query = key === "users" ? model.find().select("-password") : model.find();
    data[key] = await query.sort({ createdAt: -1 }).limit(1000).lean();
  }

  if (format === "csv" && type !== "all") {
    const csv = toCsv((data[type] || []) as Record<string, unknown>[]);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vinhworks-${type}.csv"`,
      },
    });
  }

  return NextResponse.json(data, {
    headers: {
      "Content-Disposition": `attachment; filename="vinhworks-export.json"`,
    },
  });
}
