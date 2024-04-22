"use client";
import { MobileSideBar } from "@/components/MobileSideBar";
import React, { ReactNode, createContext, useState } from "react";

interface ContextProps {
  MobileMenuToggle: () => void;
  mobileMenu: boolean;
}

export const MobileMenuContext = createContext<ContextProps>({
  MobileMenuToggle: () => {},
  mobileMenu: false,
});

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const MobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <MobileMenuContext.Provider value={{ MobileMenuToggle, mobileMenu }}>
      {children}
      {mobileMenu && <MobileSideBar />}
    </MobileMenuContext.Provider>
  );
};
