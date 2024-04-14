"use server";

import { db } from "@/lib/db";

export const deleteSortie = async (id: string) => {
  try {
    const sortie = await db.sortie.findUnique({
      where: { id: id },
    });
    if (!sortie) return { error: "Operation does not exist" };
    const article = await db.article.findUnique({
      where: { ref: sortie?.ref },
    });

    await db.article.update({
      where: { ref: sortie?.ref },
      data: {
        quantity: article?.quantity! + sortie?.quantity,
      },
    });

    await db.sortie.delete({
      where: { id: id },
    });

    return { success: "The operation deleted successfully" };
  } catch (error) {
    console.log(error);
  }
};
