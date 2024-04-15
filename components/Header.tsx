import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { AddButton } from "./AddButton";
import { auth } from "@/auth.Js";
import { getUserById } from "@/data/user";
import Image from "next/image";

export const Header = async () => {
  const session = await auth();
  const user = session?.user;
  const currentUser = await getUserById(user?.id);
  const name = currentUser?.name.split(" ")[0];
  return (
    <header className="flex items-center justify-end w-full h-20 px-8 border-b border-Charcoal-Blue shadow-sm bg-Dark-Charcoal-Gray gap-x-8">
      <AddButton />
      <div className="flex items-center gap-x-2 text-white">
        <b className="capitalize">{name}</b>
        {currentUser?.image ? (
          <Image src={currentUser.image} alt="user picture" width={50} height={50} className="rounded-full" />
        ) : (
          <FaCircleUser className="text-4xl " />
        )}
      </div>
    </header>
  );
};
