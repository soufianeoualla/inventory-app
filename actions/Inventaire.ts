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

export const editInventaire = async (
  name: string,
  method: string,
  id: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Pas authentifié" };

  await db.inventory.update({
    where: { id: id },
    data: {
      name: name,
      method: method,
    },
  });
  return { success: "inventaire modifié avec succès" };
};

export const deleteInventory = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Pas authentifié" };

  await db.operation.deleteMany({
    where: { inventoryId: id },
  });
  await db.article.deleteMany({
    where: { inventoryId: id },
  });
  await db.inventory.delete({
    where: { id: id },
  });
  return { success: "L'inventaire a été supprimée avec succès" };
};
