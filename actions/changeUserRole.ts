"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const changeUserRole = async (id: string, newRole: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };
  if (user.role !== "owner") return { error: "Vous n'êtes pas autorisé(e)" };
  await db.user.update({
    where: { id: id },
    data: {
      role: newRole === "admin" ? "admin" : "user",
    },
  });
  return { success:"Le rôle de l'utilisateur a été modifié avec succès"};
};
