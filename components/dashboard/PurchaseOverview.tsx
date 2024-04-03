import React from "react";
import { FaBagShopping } from "react-icons/fa6";

export const PurchaseOverview = () => {
  return (
    <div className="w-[500px]  p-8 text-white gap-x-2 text-xl font-medium -tracking-tighter border rounded-lg border-Charcoal-Blue shadow-md">
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-primary/10">
          <FaBagShopping className="text-primary" />
        </div>
        Achat
      </div>
      <div className="space-y-4 mt-8">

      <div>section 1</div>

      <div>section 2</div>

      <div>section 3</div>
      </div>
    </div>
  );
};
