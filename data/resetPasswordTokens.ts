import { db } from "@/lib/db";

export const getResetPassworTokenByEmail = async (email: string ) => {
  try {
    const verficationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verficationToken
  } catch (error) {
    return null;
  }
};


export const getResetPassworTokenByToken= async (token: string) => {
    try {
      const verficationToken = await db.verificationToken.findUnique({
        where: { token },
      });
      return verficationToken
    } catch (error) {
      return null;
    }
  };