import ActivityLog from "@/models/ActivityLog";

type ActivityInput = {
  actor?: unknown;
  action: string;
  entity: "project" | "service" | "user" | "lead" | "message" | "system";
  entityId?: string;
  description: string;
};

export async function logActivity(input: ActivityInput) {
  try {
    const actor = (input.actor || {}) as { id?: unknown; name?: unknown };
    await ActivityLog.create({
      actorId: typeof actor.id === "string" ? actor.id : "",
      actorName: typeof actor.name === "string" ? actor.name : "System",
      action: input.action,
      entity: input.entity,
      entityId: input.entityId || "",
      description: input.description,
    });
  } catch (error) {
    console.error("Activity log failed:", error);
  }
}
