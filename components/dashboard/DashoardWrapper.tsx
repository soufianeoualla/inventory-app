"use client";
import { PurchaseOverview } from "./PurchaseOverview";
import { SortieEntreeStatistics } from "./SortieEntreeStatistics";
import { SortieOverview } from "./SortieOverview";

export const DashoardWrapper = () => {
  return (
    <div className=" h-[calc(100vh-80px)] p-6 w-[calc(100vw-250px)]  bg-Charcoal overflow-y-scroll   ">
      <div className="flex justify-center items-center gap-x-8">
        <PurchaseOverview />

        <SortieOverview />
      </div>
      <div className="flex items-center justify-center mt-10">

      <SortieEntreeStatistics />
      </div>
    </div>
  );
};
