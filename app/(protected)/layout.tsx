import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="grid grid-cols-[250px,1fr] bg-Charcoal">
      <Sidebar />
      <div>
        <Header />
        {children}
      </div>
    </main>
  );
};

export default layout;
