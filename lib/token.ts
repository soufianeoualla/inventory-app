import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { db } from "./db";
import { getResetPassworTokenByEmail } from "@/data/resetPasswordTokens";
export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verficationToken;
};


export const generateResetPasswordTokens = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPassworTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verficationToken;
};
