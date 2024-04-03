import React from "react";
import { Filters } from "../Filters";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { Items } from "../achat/Items";

export const SortieWrapper = () => {
  return (
    <div className="w-[900px] mx-auto space-y-16">
      <div className="flex justify-end items-center gap-x-8">
        <Filters />
        <Button className="flex items-center gap-x-2 font-bold">
          <FaPlus />
          Ajouter un Sortie
        </Button>
      </div>
      <Items />
    </div>
  );
};
