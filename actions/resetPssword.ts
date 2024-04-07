"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { ResetSchema } from "@/schemas";


export const changePassword = async (
  token: string,
  values: z.infer<typeof ResetSchema>
) => {
  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }
  const { password } = validateFields.data;

  const existingToken = await getVerificationTokenByToken(token);
  const existingUser = await getUserByEmail(existingToken?.email as string);

  if (!existingUser) return { error: "Email does not exist" };
  if (existingToken) {
    const newHashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        password: newHashedPassword,
      },
    });
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
    return { success: "Your password got changed" };
  }
};
