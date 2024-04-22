import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { AddButton } from "./AddButton";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import Image from "next/image";
import logo from "@/public/logo.png";
import { IoMenu } from "react-icons/io5";
import { MenuButton } from "./MenuButton";

export const Header = async () => {
  const session = await auth();
  const user = session?.user;
  const currentUser = await getUserById(user?.id);
  const name = currentUser?.name.split(" ")[0];
  return (
    <header className="flex items-center justify-end w-full h-20 px-8 border-b border-Charcoal-Blue shadow-sm bg-Dark-Charcoal-Gray gap-x-8 sm:w-screen sm:justify-between sm:px-4">
      <div className="hidden sm:flex items-center gap-x-2 text-white text-md">
        <MenuButton />
        <div className=" logo h-20 border-b border-b-slate-500/20 flex items-center w-full gap-x-2  font-bold uppercase tracking-wide ">
          <Image src={logo} alt="logo" className=" w-10" />
          Inventory
        </div>
      </div>
      <div className="flex items-center gap-x-2 text-white">
        {user?.role !== "user" && <AddButton />}
        <b className="capitalize sm:hidden">{name}</b>
        {currentUser?.image ? (
          <Image
            src={currentUser.image}
            alt="user picture"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <FaCircleUser className="text-4xl " />
        )}
      </div>
    </header>
  );
};
