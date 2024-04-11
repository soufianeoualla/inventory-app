'use server'

import { auth } from "@/auth";
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
    });
    return entree;
  } catch (error) {
    return null;
  }
};
