import { formatPrice } from "@/lib/functions";
import React from "react";
import { IoEnter } from "react-icons/io5";

interface Props{
  date:string
  quantity:number | undefined,
  total:number | undefined
}


export const PurchaseOverview = ({date,quantity,total}:Props) => {
  return (
    <div className="w-[500px] sm:w-full  p-8 text-white gap-x-2 font-medium -tracking-tighter border rounded-lg border-Dark-Charcoal-Gray shadow-md bg-gradient-to-br from-accent/40 to-card ">
      <div className="flex items-center gap-x-4  text-xl capitalize">
        <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-primary/10">
          <IoEnter className="text-primary" />
        </div>
        {date}
      </div>
      <div className="space-y-4 mt-8">
        <div className="grid gap-y-2">
          <span>Quantité: {quantity} </span>
          <span>total: {total && formatPrice(total) } </span>
        </div>
    
      </div>
    </div>
  );
};
