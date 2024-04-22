"use client";
import React, { useContext } from "react";
import { Sidebar } from "./Sidebar";
import { MobileMenuContext } from "@/context/MobileMenuContext";

export const MobileSideBar = () => {
  const { MobileMenuToggle } = useContext(MobileMenuContext);

  return (
    <>
      <div
        onClick={MobileMenuToggle}
        className="w-full top-0 left-0 h-full fixed bg-background/70 z-10  "
      ></div>
      <Sidebar />
    </>
  );
};
