"use server";

import { db } from "@/lib/db";

export const deleteEntree = async (id: string) => {
    try {
        const entree = await db.entree.findUnique({
          where: { id: id },
        });
        if (!entree) return { error: "Operation does not exist" };
        const article = await db.article.findUnique({
          where: { ref: entree?.ref },
        });
      
        await db.article.update({
          where: { ref: entree?.ref },
          data: {
            quantity: article?.quantity! - entree?.quantity,
          },
        });
      
        await db.entree.delete({
          where: { id: id },
        });
      
        return { success: "The operation deleted successfully" };
        
    } catch (error) {
        console.log(error)
    }
};
