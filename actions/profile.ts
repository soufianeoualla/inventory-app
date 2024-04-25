"use server";
import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { NewPasswordSchema, changeNameEmailSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const makeNewPssword = async (
  values: z.infer<typeof NewPasswordSchema>
) => {
  const session = await auth();
  const user = session?.user;

  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Champs invalides" };
  }
  const { newPassword, oldPassword } = validateFields.data;

  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "Utilisateur non trouvé" };
  const passwordMatch = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  if (!passwordMatch) return { error: "Le mot de passe actuel est incorrect" };
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  return { success: "Votre mot de passe a été modifié avec succès" };
};

export const changeNameEmail = async (
  values: z.infer<typeof changeNameEmailSchema>
) => {
  const session = await auth();
  const user = session?.user;

  const { email, name } = values;
  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "Utilisateur non trouvé" };

  const currentEmail = existingUser.email === email;

  if (currentEmail) {
    await db.user.update({
      where: { id: user?.id },
      data: {
        name: name,
      },
    });
    return { success: "Nom modifié avec succès!" };
  }

  const usedEmail = await getUserByEmail(email);

  if (usedEmail && !currentEmail) return { error: "L'email est déjà utilisé" };

  await db.user.update({
    where: { id: user?.id },
    data: {
      name: name,
      email: email,
      emailVerified: null,
    },
  });
  const verficationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verficationToken.email,
    verficationToken.token,
    name
  );
  return { success: "Email de confirmation envoyé !" };
};

export const AddImage = async (image: string) => {
  const session = await auth();
  const user = session?.user;
  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "Utilisateur non trouvé" };
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      image: image,
    },
  });
  return { success: "Image ajoutée avec succès !" };
};
