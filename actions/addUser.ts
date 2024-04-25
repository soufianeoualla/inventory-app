"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { AddUserEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { AdduserSchema } from "@/schemas";
export const addUser = async (
  values: z.infer<typeof AdduserSchema>,
  role: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Non connecté" };
  if (user.role !== "owner") return { error: "Vous n'êtes pas autorisé(e)" };
  const validateFields = AdduserSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Champs invalides!" };
  }
  const { email, name } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "L'utilisateur existe déjà" };
  const password = uuid().slice(0,8);
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      companyId: user.companyId,
      name: name,
      email: email,
      password: hashedPassword,
      emailVerified: new Date(),
      role: role === 'admin' ? "admin" : "user",
    },
  });
  await AddUserEmail(email, name, password);
  return { success: "Utilisateur ajouté avec succès" };
};
