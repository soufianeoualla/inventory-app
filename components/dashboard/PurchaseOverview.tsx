import React from "react";
import { IoEnter } from "react-icons/io5";

export const PurchaseOverview = () => {
  return (
    <div className="w-[500px]  p-8 text-white gap-x-2 text-xl font-medium -tracking-tighter border rounded-lg border-Dark-Charcoal-Gray shadow-md bg-gradient-to-br from-accent/40 to-card ">
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-primary/10">
          <IoEnter className="text-primary" />
        </div>
        Entrée
      </div>
      <div className="space-y-4 mt-8">
        <div>section 1</div>

        <div>section 2</div>

        <div>section 3</div>
      </div>
    </div>
  );
};
