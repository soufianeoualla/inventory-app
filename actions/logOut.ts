"use server";

import { signOut } from "@/auth.Js";

export const logOut = async () => {
      await signOut()
  
};