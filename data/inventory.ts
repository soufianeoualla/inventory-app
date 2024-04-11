'use server'
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getInventory = async () => {
  const session = await auth();
  const companyId = session?.user?.companyId;
  try {
    const inventory = await db.inventory.findFirst({
      where: { companyId: companyId },
      include: { article: true },
    });
    return inventory;
  } catch (error) {
    return null;
  }
};
export const getArticles = async () => {
  try {
    const inventory = await getInventory();

    const articles = await db.article.findMany({
      where: { inventoryId: inventory!.id },
    });
    return articles;
  } catch (error) {
    return null;
  }
};
