"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getInventories = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;
  try {
    const inventory = await db.inventory.findMany({
      where: { companyId: companyId },
      include: { article: true },
    });
    return inventory;
  } catch (error) {
    return null;
  }
};

export const getInventoryIndex = async (id: string) => {
  const res = await getInventories();
  const selectedInventory = res?.findIndex((item) => item.id === id);
  return selectedInventory;
};

export const getInventory = async (id: string) => {
  try {
    const inventory = await db.inventory.findUnique({
      where: { id: id },
      include: { article: true },
    });
    return inventory;
  } catch (error) {
    return null;
  }
};

export const getArticles = async (inventoryId: string) => {
  try {
    const articles = await db.article.findMany({
      where: { inventoryId: inventoryId },
    });
    return articles;
  } catch (error) {
    return null;
  }
};
export const getArticle = async (ref: number, inventoryId: string) => {
  try {
    const articles = await db.article.findUnique({
      where: {
        ref_inventoryId: {
          ref: ref,
          inventoryId: inventoryId,
        },
      },
    });
    return articles;
  } catch (error) {
    return null;
  }
};

export const getArticleByRef = async (ref: number) => {
  try {
    const article = await db.article.findFirst({
      where: {
        ref: ref,
      },
    });
    return article;
  } catch (error) {
    return null;
  }
};

export const getArticleOperations = async (
  ref: string,
  inventoryId: string
) => {
  try {
    const operation = await db.operation.findMany({
      where: {
        ref: parseInt(ref),
        inventoryId: inventoryId,
      },
      orderBy: { createdAt: "desc" },
    });

    return operation;
  } catch (error) {
    return null;
  }
};

export const getAllOperations = async (inventoryId: string) => {
  try {
    const operation = await db.operation.findMany({
      where: {
        inventoryId: inventoryId,
      },
    });

    return operation;
  } catch (error) {
    return null;
  }
};
