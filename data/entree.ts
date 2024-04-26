"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getEntree = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;

  try {
    const entree = await db.operation.findMany({
      where: { companyId: companyId, type: "entree" },
      orderBy: { date: "desc" },
    });
    return entree;
  } catch (error) {
    return null;
  }
};
export const getPendingEntree = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;

  try {
    const entree = await db.operation.findMany({
      where: { companyId: companyId, type: "entree", status: "pending" },
      orderBy: { date: "desc" },
    });
    return entree;
  } catch (error) {
    return null;
  }
};

export const getSingleEntree = async (id: string) => {
  try {
    const entree = await db.operation.findUnique({
      where: { id: id },
    });
    return entree;
  } catch (error) {
    return null;
  }
};
