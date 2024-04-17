"use server";

import { auth } from "@/auth";
import { getProductByRef } from "@/data/products";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getInventory } from "@/data/inventory";

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
  const { name, quantity, ref, category } = validateFields.data;

  const existingProduct = await getProductByRef(parseInt(ref));
  if (!existingProduct) {
    await db.article.create({
      data: {
        category: category,
        name: name,
        quantity: parseInt(quantity),
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
      companyId: user.companyId,
      id: id,
      category: category,
      inventoryId: inventoryId,
      inventoryName: inventoryName!,
      article: name,
      date: date,
      quantity: parseInt(quantity),
      ref: parseInt(ref),
      email: user.email!,
    },
  });
  if (existingProduct) {
    await db.article.update({
      where: { id: existingProduct?.id },
      data: { quantity: existingProduct.quantity + parseFloat(quantity) },
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
  const { name, quantity, ref, category } = validateFields.data;
  const entree = await db.entree.findUnique({
    where: { id: operationId },
  });
  const inventoryId = entree?.inventoryId;
  if (!entree) return { error: "Operation does not exist" };
  const article = await db.article.findUnique({
    where: { ref: entree?.ref },
  });

  await db.article.update({
    where: { ref: entree?.ref },
    data: {
      quantity: article?.quantity! - entree?.quantity,
    },
  });

  await db.entree.delete({
    where: { id: operationId },
  });

  const existingProduct = await getProductByRef(parseInt(ref));
  if (!existingProduct) {
    await db.article.create({
      data: {
        category: category,
        name: name,
        quantity: parseInt(quantity),
        ref: parseInt(ref),
        inventoryId: inventoryId,
      },
    });
  }
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;

  await db.entree.create({
    data: {
      inventoryName: inventoryName!,
      companyId: user.companyId,
      id: operationId,
      category: category,
      inventoryId: inventoryId,
      article: name,
      date: date,
      quantity: parseInt(quantity),
      ref: parseInt(ref),
      email: user.email!,
    },
  });
  if (existingProduct) {
    await db.article.update({
      where: { id: existingProduct?.id },
      data: { quantity: existingProduct.quantity + parseFloat(quantity) },
    });
  }

  return { success: "Opertaion successfully done" };
};
