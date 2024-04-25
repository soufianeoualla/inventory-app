"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Champs invalides!" };
  }
  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser && !existingUser.emailVerified) {
    const verficationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verficationToken.email,
      verficationToken.token,
      existingUser.name as string
    );
    return { success: "Email de confirmation envoyé !" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Identifiants invalides !" };
        default:
          console.log(error);
          return { error: "Quelque chose s'est mal passé !" };
      }
    }

    throw error;
  }
};
