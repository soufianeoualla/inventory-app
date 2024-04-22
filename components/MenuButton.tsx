"use client";
import { MobileMenuContext } from "@/context/MobileMenuContext";
import { useContext } from "react";
import { IoMenu } from "react-icons/io5";

export const MenuButton = () => {
  const { MobileMenuToggle } = useContext(MobileMenuContext);
  return (
    <div onClick={MobileMenuToggle}>
      <IoMenu className="text-3xl" />
    </div>
  );
};
