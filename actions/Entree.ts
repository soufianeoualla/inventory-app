"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { getArticle, getInventory } from "@/data/inventory";
import { getPendingEntree } from "@/data/entree";

export const addEntree = async (
  values: z.infer<typeof ProductSchema>,
  date: Date,
  inventoryId: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Champs invalides!" };
  }
  const { name, quantity, ref, category, unitPrice } = validateFields.data;
  const id = uuid().slice(0, 7);
  const currentDate = new Date();
  const pending = date > currentDate;
  const existingProduct = await getArticle(parseInt(ref), inventoryId);
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  if (pending)  {
    await db.operation.create({
      data: {
        inventoryName: inventoryName!,
        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        companyId: user.companyId,
        id: id,
        category: category,
        inventoryId: inventoryId,
        article: name,
        date: date,
        ref: parseInt(ref),
        email: user.email!,
        type: "entree",
        status: "pending",
      },
    });
    if (!existingProduct) {
      await db.article.create({
        data: {
          price: 0,
          quantity: 0,
          total: 0,
          category: category,
          name: name,
          ref: parseInt(ref),
          inventoryId: inventoryId,
        },
      });
    }
  } else {
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

    await db.operation.create({
      data: {
        inventoryName: inventoryName!,

        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        companyId: user.companyId,
        id: id,
        category: category,
        inventoryId: inventoryId,
        article: name,
        date: date,
        ref: parseInt(ref),
        email: user.email!,
        type: "entree",
        status: "completed",
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
  }

  return { success: "L'opération a été effectuée avec succès" };
};

export const editEntree = async (
  values: z.infer<typeof ProductSchema>,
  date: Date,
  operationId: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Champs invalides!" };
  }
  const { name, quantity, ref, category, unitPrice } = validateFields.data;
  const entree = await db.operation.findUnique({
    where: { id: operationId },
  });
  if (!entree) return { error: "L'operation est introvable" };
  const inventoryId = entree?.inventoryId;
  const article = await getArticle(entree.ref, entree.inventoryId);
  if (!article) return { error: "L'article est introvable" };

  const newQuantity = article.quantity - entree.quantity;
  const currentTotalCost = article.price * article.quantity;
  const newTotalCost = currentTotalCost - entree.price * entree.quantity;
  const newPrice = newTotalCost / newQuantity;
  await db.article.update({
    where: {
      ref_inventoryId: { ref: entree?.ref, inventoryId: entree.inventoryId },
    },
    data: {
      quantity: newQuantity <= 0 ? newQuantity : 0,
      price: newPrice <= 0 ? newPrice : 0,
      total: newPrice * newQuantity <= 0 ? newPrice * newQuantity : 0,
    },
  });

  await db.operation.delete({
    where: { id: operationId },
  });

  const currentDate = new Date();
  const pending = date > currentDate;
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  const existingProduct = await getArticle(parseInt(ref), inventoryId);

  if (pending) {
    await db.operation.create({
      data: {
        inventoryName: inventoryName!,
        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        companyId: user.companyId,
        id: operationId,
        category: category,
        inventoryId: inventoryId,
        article: name,
        date: date,
        ref: parseInt(ref),
        email: user.email!,
        type: "entree",
        status: "pending",
      },
    });
    if (!existingProduct) {
      await db.article.create({
        data: {
          price: 0,
          quantity: 0,
          total: 0,
          category: category,
          name: name,
          ref: parseInt(ref),
          inventoryId: inventoryId,
        },
      });
    }
  } else {
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

    await db.operation.create({
      data: {
        inventoryName: inventoryName!,
        price: parseFloat(unitPrice),
        quantity: parseInt(quantity),
        total: parseFloat(unitPrice) * parseInt(quantity),
        companyId: user.companyId,
        id: operationId,
        category: category,
        inventoryId: inventoryId,
        article: name,
        date: date,
        ref: parseInt(ref),
        email: user.email!,
        type: "entree",
        status: "completed",
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
  }
  return { success: "L'opération a été effectuée avec succès" };
};

export const addPendingEntree = async () => {
  const currentDate = new Date();
  const pendingEntree = await getPendingEntree();

  if (!pendingEntree) return;

  for (const item of pendingEntree) {
    if (item.date <= currentDate) {
      const article = await getArticle(item.ref, item.inventoryId);
      if (!article) continue; 

      const newQuantity = article.quantity + item.quantity;
      const currentTotalCost = article.price * article.quantity;
      const newTotalCost = currentTotalCost + item.price * item.quantity;
      const newPrice = newTotalCost / newQuantity;
      await db.operation.update({
        where: { id: item.id },
        data: {
          status: "completed",
        },
      });
      await db.article.update({
        where: { id: article.id },
        data: {
          quantity: newQuantity,
          price: newPrice,
          total: newPrice * newQuantity,
        },
      });
    }
  }
};
