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
  const pending = date > new Date();

  const inventory = await getInventory(inventoryId!);
  const inventoryName = inventory?.name;

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
      status: pending ? "pending" : "completed",
    },
  });
  const existingProduct = await getArticle(parseInt(ref), inventoryId);
  
  if (!pending) {
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
    } else {
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
  } else {
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

  if (!entree) return { error: "L'opération est introuvable" };

  const inventoryId = entree.inventoryId;
  const article = await getArticle(entree.ref, entree.inventoryId);

  if (!article) return { error: "L'article est introuvable" };
  const currentDate = new Date();
  const newQuantity = Math.max(article.quantity - entree.quantity, 0);
  const currentTotalCost = article.price * article.quantity;
  const newTotalCost = Math.max(
    currentTotalCost - entree.price * entree.quantity,
    0
  );
  const newPrice = newQuantity === 0 ? 0 : newTotalCost / newQuantity;

  if (entree.status !=='pending') {
    await db.article.update({
      where: {
        ref_inventoryId: { ref: entree.ref, inventoryId: entree.inventoryId },
      },
      data: {
        quantity: newQuantity,
        price: newPrice,
        total: newPrice * newQuantity,
      },
    });
  }


  const isPending = date > currentDate;
  const res = await getInventory(inventoryId!);
  const inventoryName = res?.name;
  const existingProduct = await getArticle(parseInt(ref), inventoryId);

  await db.operation.update({
    where:{id:operationId},
    data: {
      inventoryName: inventoryName!,
      price: parseFloat(unitPrice),
      quantity: parseInt(quantity),
      total: parseFloat(unitPrice) * parseInt(quantity),
      category: category,
      inventoryId: inventoryId,
      article: name,
      date: date,
      ref: parseInt(ref),
      email: user.email!,
      status: isPending ? "pending" : "completed",
    },
  });
  if (!isPending) {
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
    } else {
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
  } else {
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
