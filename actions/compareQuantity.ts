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
  const result = article?.quantity - parseInt(quantity);

  if (article?.quantity! < parseInt(quantity)) {
    return {
      error: `quantité theorique - quantité physique: ${result} `,
    };
  } else if (article?.quantity > parseInt(quantity)) {
    return {
      error: `quantité theorique - quantité physique: ${result} `,
    };
  } else if (article?.quantity === parseInt(quantity)) {
    return {
      success: `quantité theorique - quantité physique: ${result} `,
    };
  }
};
