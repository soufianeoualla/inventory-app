"use server";

import { auth } from "@/auth.Js";
import { db } from "@/lib/db";

export const getEntree = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;
  const inventory = await db.inventory.findFirst({
    where: { companyId: companyId },
  });
  try {
    const entree = await db.entree.findMany({
      where: { inventoryId: inventory?.id },
      orderBy: { date: "desc" },
    });
    return entree;
  } catch (error) {
    return null;
  }
};

export const getSingleEntree = async (id: string) => {
  try {
    const entree = await db.entree.findUnique({
      where: { id: id },
    });
    return entree;
  } catch (error) {
    return null;
  }
};
