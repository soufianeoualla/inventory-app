"use client";
import { MobileSideBar } from "@/components/MobileSideBar";
import { usePathname } from "next/navigation";
import React, { ReactNode, createContext, useEffect, useState } from "react";

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
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenu(false); 
  }, [pathname]);
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
