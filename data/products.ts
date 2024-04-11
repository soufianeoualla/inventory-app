import { db } from "@/lib/db";

export const getProductByRef = async (ref: number) => {
  try {
    const product = await db.article.findUnique({ where: { ref: ref } });
    return product;
  } catch (error) {
    return null;
  }
};
