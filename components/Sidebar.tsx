"use client";
import Image from "next/image";
import logo from "@/public/box_7649763.png";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoExit } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";


export const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Dahboard",
      href: "/dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      name: "Achat",
      href: "/achat",
      icon: <FaBagShopping />,
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
  ];
  return (
    <div className="shadow-md border-l  h-screen bg-Dark-Charcoal-Gray border-Charcoal-Blue ">
      <div className="logo h-20 border-b border-b-slate-500/20 flex items-center w-full gap-x-2 text-xl font-bold uppercase tracking-wide px-8 text-white">
        <Image src={logo} alt="logo" className=" w-10" />
        Inventory
      </div>
      <div className="mt-8">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3  px-8  w-[90%] rounded-r-3xl h-12 ${
              pathname === item.href
                ? "bg-primary text-white"
                : "text-Slate-Blue"
            } `}
          >
            {item.icon}
            <b className="">{item.name} </b>
          </Link>
        ))}
      </div>
    </div>
  );
};
