"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const changeUserRole = async (id: string, newRole: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };
  if (user.role !== "owner") return { error: "Your not authorized" };
  await db.user.update({
    where: { id: id },
    data: {
      role: newRole === "admin" ? "admin" : "user",
    },
  });
  return { success: "User role changed successfully" };
};
