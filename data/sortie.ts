"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getSortie = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;

  try {
    const sortie = await db.sortie.findMany({
      where: { companyId: companyId },
    });
    return sortie;
  } catch (error) {
    return null;
  }
};

export const getSingleSortie = async (id: string) => {
  try {
    const sortie = await db.sortie.findUnique({
      where: { id: id },
    });
    return sortie;
  } catch (error) {
    return null;
  }
};
