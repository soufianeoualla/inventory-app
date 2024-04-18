"use server";

import { db } from "@/lib/db";

export const deleteArticle = async (id: string) => {
  try {
    const article = await db.article.findUnique({ where: { id: id } });

    if (!article) return { error: "article not found" };
    await db.entree.deleteMany({
      where: { ref: article.ref ,inventoryId:article.inventoryId },
    });
    await db.sortie.deleteMany({
      where: { ref: article.ref ,inventoryId:article.inventoryId },
    });

    await db.article.delete({
      where: { id: id },
    });

    return { success: "The operation deleted successfully" };
  } catch (error) {
    console.log(error);
  }
};
