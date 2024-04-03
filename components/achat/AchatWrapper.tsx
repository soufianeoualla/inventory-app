import { Items } from "./Items";
import { Filters } from "../Filters";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";

export const AchatWrapper = () => {
  return (
    <>
      <div className="w-[900px] mx-auto space-y-16">
        <div className="flex justify-end items-center gap-x-8">
          <Filters />
          <Button className="flex items-center gap-x-2 font-bold">
            <FaPlus />
            Ajouter un Achat
          </Button>
        </div>
        <Items />
      </div>
    </>
  );
};
