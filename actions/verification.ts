'use server'
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const verification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (existingToken) {
    const existingUser = await getUserByEmail(existingToken?.email as string);
  
    if (!existingUser) return { error: "Email non trouvé" };
    const isExpired = new Date(existingToken.expires) < new Date();
    if (isExpired) return { error: "Le lien a expiré" };

    await db.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), email: existingToken.email },
    });

    await db.verificationToken.delete({ where: { id: existingToken.id } });
    return { success: "Email vérifié" };
  }
};
