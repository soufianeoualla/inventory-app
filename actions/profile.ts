"use server";
import { auth } from "@/auth.Js";
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
    return { error: "Invalid Fields" };
  }
  const { newPassword, oldPassword } = validateFields.data;

  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "user not found" };
  const passwordMatch = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  if (!passwordMatch) return { error: "Current Password is Worng" };
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  return { success: "Your password got changed" };
};

export const changeNameEmail = async (
  values: z.infer<typeof changeNameEmailSchema>
) => {
  const session = await auth();
  const user = session?.user;

  const { email, name } = values;
  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "user not found" };

  const currentEmail = existingUser.email === email;

  if (currentEmail) {
    await db.user.update({
      where: { id: user?.id },
      data: {
        name: name,
      },
    });
    return { success: "Name changed succesfully!" };
  }

  const usedEmail = await getUserByEmail(email);

  if (usedEmail && !currentEmail) return { error: "Email is Already in use" };

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
  return { success: "Confirmation email sent!" };
};

export const AddImage = async (image: string) => {
  const session = await auth();
  const user = session?.user;
  const existingUser = await getUserById(user?.id);
  if (!existingUser) return { error: "user not found" };
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      image: image,
    },
  });
  return { success: "Picture added successfully!" };
};
