import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="grid grid-cols-[250px,1fr] bg-Charcoal sm:grid">
      <div className="sm:hidden">

      <Sidebar />
      </div>
      <div>
        <MobileMenuProvider>
          <Header />
          <div className="h-[calc(100vh-80px)]  w-[calc(100vw-250px)]  bg-Charcoal overflow-y-scroll  sm:w-screen sm:px-4">
          {children}

          </div>
        </MobileMenuProvider>
      </div>
    </main>
  );
};

export default layout;
