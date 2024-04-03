import Image from "next/image";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { AddButton } from "./AddButton";

export const Header = () => {
  return (
    <header className="flex items-center justify-end w-full h-20 px-8 border-b border-Charcoal-Blue shadow-sm bg-Dark-Charcoal-Gray gap-x-8">
      <AddButton/>
      <div className="flex items-center gap-x-2 text-white">
        <b>Soufiane</b>
        <FaCircleUser className="text-4xl "/>
      </div>
    </header>
  );
};
