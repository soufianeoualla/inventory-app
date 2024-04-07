import React from "react";

export const InventoryItemCard = () => {
  return (
    <div className="px-4 py-8 rounded-lg flex items-center justify-between w-[400px] text-white bg-gradient-to-br from-accent/20 to-card shadow-md ">
      <div className="grid gap-y-2">
        <b className="text-Slate-Blue">Id</b>
        <strong>Article</strong>
      </div>
      <div className="grid gap-y-2">
        <b>Quantity</b>
        <b>Category</b>
      </div>

      <div className="w-[144px] h-12 rounded-lg bg-emerald-500/10 flex justify-center items-center gap-x-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-emerald-500">In Stock </span>
      </div>
    </div>
  );
};
