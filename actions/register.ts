"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, company } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const Company = await db.company.create({
    data: {
      name: company,
    },
  });

  await db.user.create({
    data: {
      companyId: Company.id,
      name,
      email,
      password: hashedPassword,
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
