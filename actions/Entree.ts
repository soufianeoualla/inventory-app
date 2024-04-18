"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getArticle, getInventory } from "@/data/inventory";

export const addEntree = async (
  values: z.infer<typeof ProductSchema>,
  date: Date,
  inventoryId: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, quantity, ref, category, unitPrice } = validateFields.data;

  const existingProduct = await getArticle(parseInt(ref), inventoryId);
  if (!existingProduct) {
    await db.article.create({
      data: {
        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        category: category,
        name: name,
        ref: parseInt(ref),
        inventoryId: inventoryId,
      },
    });
  }
  const id = uuid().slice(0, 7);
  const res = await getInventory(inventoryId);
  const inventoryName = res?.name;

  await db.entree.create({
    data: {
      price: parseFloat(unitPrice),
      quantity: parseInt(quantity),
      total: parseFloat(unitPrice) * parseInt(quantity),
      companyId: user.companyId,
      id: id,
      category: category,
      inventoryId: inventoryId,
      inventoryName: inventoryName!,
      article: name,
      date: date,
      ref: parseInt(ref),
      email: user.email!,
    },
  });
  if (existingProduct) {
    const newQuantity = existingProduct.quantity + parseInt(quantity);
    const currentTotalCost = existingProduct.price * existingProduct.quantity;
    const newTotalCost =
      currentTotalCost + parseFloat(unitPrice) * parseInt(quantity);
    const newPrice = newTotalCost / newQuantity;

    await db.article.update({
      where: { id: existingProduct?.id },
      data: {
        quantity: newQuantity,
        price: newPrice,
        total: newPrice * newQuantity,
      },
    });
  }

  return { success: "Opertaion successfully done" };
};

export const editEntree = async (
  values: z.infer<typeof ProductSchema>,
  date: Date,
  operationId: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, quantity, ref, category, unitPrice } = validateFields.data;
  const entree = await db.entree.findUnique({
    where: { id: operationId },
  });
  if (!entree) return { error: "Operation does not exist" };
  const inventoryId = entree?.inventoryId;
  const article = await getArticle(entree.ref, entree.inventoryId);

  await db.article.update({
    where: {
      ref_inventoryId: {
        ref: entree?.ref,
        inventoryId: entree.inventoryId,
      },
    },
    data: {
      quantity: {
        decrement: entree.quantity,
      },
    },
  });
  ``;

  await db.entree.delete({
    where: { id: operationId },
  });

  const existingProduct = await getArticle(parseInt(ref),inventoryId);
  if (!existingProduct) {
    await db.article.create({
      data: {
        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        category: category,
        name: name,
        ref: parseInt(ref),
        inventoryId: inventoryId,
      },
    });
  }
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  const currentUnitPrice = article?.total! / article?.quantity!;

  await db.entree.create({
    data: {
      price: currentUnitPrice,
      quantity: parseInt(quantity),
      total: currentUnitPrice * parseInt(quantity),
      inventoryName: inventoryName!,
      companyId: user.companyId,
      id: operationId,
      category: category,
      inventoryId: inventoryId,
      article: name,
      date: date,
      ref: parseInt(ref),
      email: user.email!,
    },
  });
  if (existingProduct) {
    const newQuantity = existingProduct.quantity + parseInt(quantity);
    const currentTotalCost = existingProduct.price * existingProduct.quantity;
    const newTotalCost =
      currentTotalCost + parseFloat(unitPrice) * parseInt(quantity);
    const newPrice = newTotalCost / newQuantity;

    await db.article.update({
      where: { id: existingProduct?.id },
      data: {
        quantity: newQuantity,
        price: newPrice,
        total: newPrice * newQuantity,
      },
    });
  }

  return { success: "Opertaion successfully done" };
};
