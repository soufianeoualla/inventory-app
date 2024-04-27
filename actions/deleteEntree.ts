"use server";

import { getArticle } from "@/data/inventory";
import { db } from "@/lib/db";

export const deleteEntree = async (id: string) => {
  try {
    const entree = await db.operation.findUnique({
      where: { id: id, type: "entree" },
    });
    if (!entree) return { error: "L'operation est introvable" };
    const article = await getArticle(entree.ref, entree.inventoryId);
    if (!article) return { error: "L'article est introvable" };
    const completed = entree.status === "completed";
    if (completed) {
      const newQuantity = article.quantity - entree.quantity;
      const currentTotalCost = article.price * article.quantity;
      const newTotalCost = currentTotalCost - entree.price * entree.quantity;
      const newPrice = newTotalCost / newQuantity;

      await db.article.update({
        where: {
          ref_inventoryId: {
            ref: entree?.ref,
            inventoryId: entree.inventoryId,
          },
        },
        data: {
          quantity: newQuantity,
          price: newPrice,
          total: newPrice * newQuantity,
        },
      });
    }

    await db.operation.delete({
      where: { id: id },
    });

    return { success: "L'opération a été supprimée avec succès" };
  } catch (error) {
    console.log(error);
  }
};
