"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getSingleInvoice = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  const existingUser = await getUserById(userId);
  if (!existingUser) return { error: "User not found" };
  const invoice = await db.invoice.findUnique({
    where: { id: id, userId: userId },
    include: { clientAddress: true, item: true, senderAddress: true },
  });
  if (!invoice) return { error: "Invoice not found" };
  return invoice;
};
