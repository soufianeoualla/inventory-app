'use server'
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

export const getInventoryIndex = async (id:string)=>{
  const res = await getInventories()
  const selectedInventory = res?.findIndex(item=>item.id ===id)
  return selectedInventory
}

export const getInventory = async (id:string) => {
  
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

export const getArticles = async (inventoryId:string) => {
  try {
    const articles = await db.article.findMany({
      where: { inventoryId: inventoryId },
    });
    return articles;
  } catch (error) {
    return null;
  }
};
