import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/Project";
import Message from "@/models/Message";
import User from "@/models/User";
import Service from "@/models/Service";
import { requireAdmin } from "@/libs/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();
    const since = new Date();
    since.setMonth(since.getMonth() - 5, 1);
    since.setHours(0, 0, 0, 0);

    const [projects, messages, users, services, projectSummary, roleSummary, projectTimeline, userTimeline, recentProjects, recentMessages] = await Promise.all([
      Project.countDocuments(), Message.countDocuments(), User.countDocuments(), Service.countDocuments(),
      Project.aggregate([{ $group: { _id: null, averageProgress: { $avg: "$progress" }, totalBudget: { $sum: "$budget" }, completed: { $sum: { $cond: [{ $gte: ["$progress", 100] }, 1, 0] } }, active: { $sum: { $cond: [{ $and: [{ $gt: ["$progress", 0] }, { $lt: ["$progress", 100] }] }, 1, 0] } } } }]),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
      Project.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
      User.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
      Project.find().sort({ updatedAt: -1 }).limit(5).select("name client status progress priority updatedAt image").lean(),
      Message.find().sort({ createdAt: -1 }).limit(5).select("senderName content isAdmin createdAt").lean(),
    ]);

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(); date.setMonth(date.getMonth() - (5 - index), 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return { key, label: `T${date.getMonth() + 1}` };
    });
    const projectMap = new Map(projectTimeline.map((item) => [item._id, item.count]));
    const userMap = new Map(userTimeline.map((item) => [item._id, item.count]));
    const roles = Object.fromEntries(roleSummary.map((item) => [item._id, item.count]));
    const summary = projectSummary[0] || {};

    return NextResponse.json({
      totals: { projects, messages, users, services },
      projects: { completed: summary.completed || 0, active: summary.active || 0, averageProgress: Math.round(summary.averageProgress || 0), totalBudget: summary.totalBudget || 0 },
      users: { admins: roles.admin || 0, members: roles.user || 0 },
      timeline: months.map((month) => ({ label: month.label, projects: projectMap.get(month.key) || 0, users: userMap.get(month.key) || 0 })),
      recentProjects,
      recentMessages,
      generatedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Không thể tải dữ liệu dashboard" }, { status: 500 });
  }
}
