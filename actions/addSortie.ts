"use server";

import { auth } from "@/auth";
import { getProductByRef } from "@/data/products";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const addEntree = async (values: z.infer<typeof ProductSchema>) => {
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
  if (!existingProduct)
    return { error: "Article does not exist on the inventory" };

  if (existingProduct.quantity < parseInt(quantity))
    return { error: "You don't have enough Quantity on this article" };

  await db.sortie.create({
    data: {
      email: user.email!,
      quantity: parseInt(quantity),
      ref: parseInt(ref),
      article: name,
      date: new Date(),
      inventoryId: inventory.id,
    },
  });

  return { success: "Opertaion successfully done" };
};
