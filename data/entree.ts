"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getEntree = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;
  
  try {
    const entree = await db.entree.findMany({
      where: { companyId: companyId },
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
