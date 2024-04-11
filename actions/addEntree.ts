"use server";

import { auth } from "@/auth";
import { getProductByRef } from "@/data/products";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const addEntree = async (
  values: z.infer<typeof ProductSchema>,
  category: string,
  date: Date
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "not logged In" };
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, quantity, ref } = validateFields.data;

  const company = await db.company.findUnique({
    where: { id: user.companyId },
  });
  if (!company) return { error: "Something went wrong" };
  const inventory = await db.inventory.findFirst({
    where: { companyId: company.id },
  });
  if (!inventory) return { error: "Something went wrong" };
  const existingProduct = await getProductByRef(parseInt(ref));
  if (!existingProduct) {
    await db.article.create({
      data: {
        category: category,
        name: name,
        quantity: parseInt(quantity),
        ref: parseInt(ref),
        inventoryId: inventory.id,
      },
    });
  }

  await db.entree.create({
    data: {
      inventoryId: inventory.id,
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
      data: { quantity: +quantity },
    });
  }

  return { success: "Opertaion successfully done" };
};
