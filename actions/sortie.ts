"use server";

import { auth } from "@/auth";
import { getArticle, getInventory } from "@/data/inventory";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
interface values {
  selectedName: string;
  selectedRef: string;
  quantity: string;
  date: Date;
}

export const addSortie = async (sortieValues: values, inventoryId: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };

  const { selectedName, quantity, selectedRef, date } = sortieValues;

  const existingProduct = await getArticle(parseInt(selectedRef), inventoryId);
  if (!existingProduct)
    return { error: "L'article n'existe pas dans l'inventaire" };

  if (existingProduct.quantity < parseInt(quantity))
    return { error: "Vous n'avez pas assez de quantité pour cet article" };
  const id = uuid().slice(0, 7);
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  await db.operation.create({
    data: {
      status: "completed",
      price: existingProduct.price,
      total: parseInt(quantity) * existingProduct.price,
      companyId: user.companyId,
      inventoryName: inventoryName!,
      id: id,
      email: user.email!,
      quantity: parseInt(quantity),
      ref: parseInt(selectedRef),
      article: selectedName,
      date: date,
      inventoryId: inventoryId,
      category: existingProduct.category,
      type: "sortie",
    },
  });

  await db.article.update({
    where: {
      ref_inventoryId: {
        ref: parseInt(selectedRef),
        inventoryId: inventoryId,
      },
    },
    data: {
      quantity: existingProduct.quantity - parseFloat(quantity),
    },
  });

  return { success: "Opération effectuée avec succès" };
};

export const editSortie = async (sortieValues: values, operationId: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };

  const { selectedName, quantity, selectedRef, date } = sortieValues;

  const sortie = await db.operation.findUnique({
    where: { id: operationId },
  });
  if (!sortie) return { error: "Operation does not exist" };
  const inventoryId = sortie?.inventoryId;
  const article = await getArticle(sortie.ref, sortie.inventoryId);
  await db.article.update({
    where: {
      ref_inventoryId: {
        ref: sortie.ref,
        inventoryId: sortie.inventoryId,
      },
    },
    data: {
      quantity: article?.quantity! + sortie?.quantity,
    },
  });
  if (sortie.quantity > article?.quantity!) return;

  await db.operation.delete({
    where: { id: operationId },
  });
  const existingProduct = await getArticle(parseInt(selectedRef), inventoryId);
  if (!existingProduct)
    return { error: "L'article n'existe pas dans l'inventaire" };

  if (existingProduct.quantity < parseInt(quantity))
    return { error: "Vous n'avez pas assez de quantité pour cet article" };

  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  await db.operation.create({
    data: {
      status: "completed",
      price: existingProduct.price,
      total: parseInt(quantity) * existingProduct.price,
      companyId: user.companyId,
      inventoryName: inventoryName!,
      id: operationId,
      email: user.email!,
      quantity: parseInt(quantity),
      ref: parseInt(selectedRef),
      article: selectedName,
      date: date,
      inventoryId: inventoryId,
      category: existingProduct.category,
      type: "sortie",
    },
  });

  await db.article.update({
    where: {
      ref_inventoryId: {
        ref: parseInt(selectedRef),
        inventoryId: inventoryId,
      },
    },
    data: {
      quantity: existingProduct.quantity - parseFloat(quantity),
    },
  });

  return { success: "Opération effectuée avec succès" };
};
