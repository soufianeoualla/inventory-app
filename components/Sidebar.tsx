"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { BiSolidDashboard } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoExit, IoEnter, IoLogOut } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Dahboard",
      href: "/dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      name: "Entrée",
      href: "/achat",
      icon: <IoEnter />,
    },
    {
      name: "Sortie",
      href: "/sortie",
      icon: <IoExit />,
    },
    {
      name: "Inventaire",
      href: "/inventaire",
      icon: <FaBox />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <div className="shadow-md border-l  h-screen bg-Dark-Charcoal-Gray border-Charcoal-Blue  relative sm:absolute sm:top-0 sm:left-0 z-20   ">
      <div className=" logo h-20 border-b border-b-slate-500/20 flex items-center w-full gap-x-2 text-xl font-bold uppercase tracking-wide px-8 text-white ">
        <Image src={logo} alt="logo" className=" w-10" />
        Inventory
      </div>
      <div className="mt-8 w-full">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3  px-8  w-[90%] rounded-r-3xl h-12 ${
              pathname.includes(item.href)
                ? "bg-primary text-white"
                : "text-Slate-Blue hover:bg-primary/60 hover:text-white"
            } `}
          >
            {item.icon}
            <b className="">{item.name} </b>
          </Link>
        ))}
      </div>
      <Button
        onClick={() => signOut()}
        variant={"ghost"}
        className="absolute left-0  w-[90%] rounded-none rounded-r-3xl bottom-10 flex gap-x-2 items-center text-Slate-Blue text-base h-12 hover:bg-primary "
      >
        <IoLogOut />
        Log Out
      </Button>
    </div>
  );
};
