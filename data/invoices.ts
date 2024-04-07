'use server'
import { auth } from "@/auth";
import { getUserById } from "./user";
import { db } from "@/lib/db";

export const getInvoices = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const existingUser = getUserById(userId);
  if (!existingUser) return { error: "user not found" };
  return await db.invoice.findMany({
    where: { userId: userId },
    include: { clientAddress: true, item: true, senderAddress: true },
    orderBy:{updatedAt:'desc'}
  });
};
