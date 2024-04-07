import { SortieWrapper } from "@/components/sortie/SortieWrapper";
import React from "react";

const SortiePage = () => {
  return (
    <div className="h-[calc(100vh-80px)] p-6 w-[calc(100vw-250px)]  bg-Charcoal overflow-y-scroll">
      <SortieWrapper />
    </div>
  );
};

export default SortiePage;
