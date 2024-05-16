"use server";

import { auth } from "@/auth";
import { getArticle } from "@/data/inventory";

export const compareQuantity = async (
  selectedRef: string,
  id: string,
  quantity: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Pas authentifié" };
  const article = await getArticle(parseInt(selectedRef), id);
  if (!article) return;
  const result = parseInt(quantity) - article?.quantity;

  if (result > 0) {
    return {
      error: `quantité physique - quantité theorique: ${result} `,
    };
  } else if (result < 0) {
    return {
      error: `quantité physique - quantité theorique: ${result} `,
    };
  } else if (result === 0) {
    return {
      success: `quantité physique - quantité theorique: ${result} `,
    };
  }
};
