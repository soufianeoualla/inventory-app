"use server";

import { getArticle } from "@/data/inventory";
import { db } from "@/lib/db";

export const deleteEntree = async (id: string) => {
  try {
    const entree = await db.operation.findUnique({
      where: { id: id },
    });
    if (!entree) return { error: "Operation does not exist" };
    const article = await getArticle(entree.ref,entree.inventoryId)
    if (!article) return { error: "Article does not exist" };

    const newQuantity = article.quantity - entree.quantity;
    const currentTotalCost = article.price * article.quantity;
    const newTotalCost = currentTotalCost - entree.price * entree.quantity;
    const newPrice = newTotalCost / newQuantity;
    await db.article.update({
      where: {
        ref_inventoryId: { ref: entree?.ref, inventoryId: entree.inventoryId },
      },
      data: {
        quantity: newQuantity,
        price: newPrice,
        total: newPrice * newQuantity,
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
