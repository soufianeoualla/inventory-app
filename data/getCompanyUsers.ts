"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getComapnyUsers = async () => {
  const session = await auth();
  const user = session?.user;
  const companyId = user?.companyId;
  try {
    const users = await db.user.findMany({
      where: { companyId: companyId },
      select:{id:true, email:true,name:true,role:true}
    });
    return users;
  } catch (error) {
    console.log(error);
    return;
  }
};
