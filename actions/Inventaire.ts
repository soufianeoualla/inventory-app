"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const addInventaire = async (name: string, method: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Pas authentifié" };

  await db.inventory.create({
    data: {
      companyId: user.companyId,
      name: name,
      method: method,
    },
  });
  return { success: "inventaire créé avec succès" };
};
