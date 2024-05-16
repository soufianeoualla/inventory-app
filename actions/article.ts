"use server";

import { db } from "@/lib/db";

export const deleteArticle = async (id: string) => {
  try {
    const article = await db.article.findUnique({ where: { id: id } });

    if (!article) return { error: "Article est introuvable" };
    await db.operation.deleteMany({
      where: { ref: article.ref, inventoryId: article. inventoryId},
    });

    await db.article.delete({
      where: { id: id },
    });

    return { success: "L'article a été supprimé avec succès." };
  } catch (error) {
    console.log(error);
  }
};


