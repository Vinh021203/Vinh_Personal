import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { getCurrentUserFromCookie } from "@/libs/auth";
import User from "@/models/User";
import { logActivity } from "@/libs/activity";

const defaultPreferences = {
  notifications: {
    email: true,
    browser: false,
    leadAlerts: true,
    messageAlerts: true,
    systemAlerts: true,
  },
  appearance: {
    language: "vi",
    theme: "light",
    compactMode: false,
    reduceMotion: false,
  },
};

function toBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizePreferences(body: any) {
  const current = body?.preferences || body || {};
  const notifications = current.notifications || {};
  const appearance = current.appearance || {};

  return {
    notifications: {
      email: toBoolean(notifications.email, defaultPreferences.notifications.email),
      browser: toBoolean(notifications.browser, defaultPreferences.notifications.browser),
      leadAlerts: toBoolean(notifications.leadAlerts, defaultPreferences.notifications.leadAlerts),
      messageAlerts: toBoolean(notifications.messageAlerts, defaultPreferences.notifications.messageAlerts),
      systemAlerts: toBoolean(notifications.systemAlerts, defaultPreferences.notifications.systemAlerts),
    },
    appearance: {
      language: appearance.language === "en" ? "en" : "vi",
      theme: "light",
      compactMode: toBoolean(appearance.compactMode, defaultPreferences.appearance.compactMode),
      reduceMotion: toBoolean(appearance.reduceMotion, defaultPreferences.appearance.reduceMotion),
    },
  };
}

export async function GET() {
  const session = await getCurrentUserFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để tiếp tục" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(session.id).select("preferences");
  if (!user) {
    return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 });
  }

  return NextResponse.json({
    preferences: {
      notifications: {
        ...defaultPreferences.notifications,
        ...(user.preferences?.notifications || {}),
      },
      appearance: {
        ...defaultPreferences.appearance,
        ...(user.preferences?.appearance || {}),
        theme: "light",
      },
    },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getCurrentUserFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để tiếp tục" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const preferences = normalizePreferences(body);

  await connectDB();
  const user = await User.findByIdAndUpdate(
    session.id,
    { preferences },
    { new: true },
  ).select("preferences name email role");

  if (!user) {
    return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 });
  }

  await logActivity({
    actor: session,
    action: "update",
    entity: "system",
    entityId: String(session.id || ""),
    description: `Cập nhật cài đặt tài khoản ${user.name}`,
  });

  return NextResponse.json({ preferences: user.preferences });
}
