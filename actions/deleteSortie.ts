"use server";

import { getArticle } from "@/data/inventory";
import { db } from "@/lib/db";

export const deleteSortie = async (id: string) => {
  try {
    const sortie = await db.operation.findUnique({
      where: { id: id },
    });
    if (!sortie) return { error: "Operation does not exist" };
    const article = await getArticle(sortie.ref, sortie.inventoryId);

    await db.article.update({
      where: {
        ref_inventoryId: { ref: sortie?.ref, inventoryId: sortie.inventoryId },
      },
      data: {
        quantity: article?.quantity! + sortie?.quantity,
      },
    });

    await db.operation.delete({
      where: { id: id },
    });

    return { success: "The operation deleted successfully" };
  } catch (error) {
    console.log(error);
  }
};
