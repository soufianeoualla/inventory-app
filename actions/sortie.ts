"use server";

import { auth } from "@/auth.Js";
import { getProductByRef } from "@/data/products";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
interface values {
  selectedName: string;
  selectedRef: string;
  quantity: string;
  date: Date;
}

export const addSortie = async (sortieValues: values) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };

  const { selectedName, quantity, selectedRef, date } = sortieValues;

  const company = await db.company.findUnique({
    where: { id: user.companyId },
  });
  if (!company) return { error: "Something went wrong" };
  const inventory = await db.inventory.findFirst({
    where: { companyId: company.id },
  });
  if (!inventory) return { error: "Something went wrong" };
  const existingProduct = await getProductByRef(parseInt(selectedRef));
  if (!existingProduct)
    return { error: "Article does not exist on the inventory" };

  if (existingProduct.quantity < parseInt(quantity))
    return { error: "You don't have enough Quantity on this article" };
  const id = uuid().slice(0, 7);
  await db.sortie.create({
    data: {
      id: id,
      email: user.email!,
      quantity: parseInt(quantity),
      ref: parseInt(selectedRef),
      article: selectedName,
      date: date,
      inventoryId: inventory.id,
      category: existingProduct.category,
    },
  });

  await db.article.update({
    where: { ref: parseInt(selectedRef) },
    data: {
      quantity: existingProduct.quantity - parseFloat(quantity),
    },
  });

  return { success: "Opertaion successfully done" };
};

export const editSortie = async (sortieValues: values,operationId:string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };

  const { selectedName, quantity, selectedRef, date } =
    sortieValues;

  const sortie = await db.sortie.findUnique({
    where: { id: operationId },
  });
  if (!sortie) return { error: "Operation does not exist" };
  const inventoryId = sortie?.inventoryId;
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
    where: { id: operationId },
  });
  const existingProduct = await getProductByRef(parseInt(selectedRef));
  if (!existingProduct)
    return { error: "Article does not exist on the inventory" };

  if (existingProduct.quantity < parseInt(quantity))
    return { error: "You don't have enough Quantity on this article" };

  await db.sortie.create({
    data: {
      id: operationId,
      email: user.email!,
      quantity: parseInt(quantity),
      ref: parseInt(selectedRef),
      article: selectedName,
      date: date,
      inventoryId: inventoryId,
      category: existingProduct.category,
    },
  });

  await db.article.update({
    where: { ref: parseInt(selectedRef) },
    data: {
      quantity: existingProduct.quantity - parseFloat(quantity),
    },
  });

  return { success: "Opertaion successfully done" };
};
