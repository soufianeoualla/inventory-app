import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { Inventories } from "./inventory/InventoryList";
interface FiltersProps {
  uniqueCategories: Array<string>;
  setcategory: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;

  setinventoryId: Dispatch<SetStateAction<string>>;
  inventories: Inventories[] | null;
}

export const Filters = ({
  uniqueCategories,
  setcategory,
  inventories,
  setinventoryId,
  setStatus,
}: FiltersProps) => {
  const status = ["en attente", "terminé"];
  return (
    <>
      <div className="flex items-center sm:w-full gap-x-4 sm:flex-wrap sm:gap-y-4">
        <Select onValueChange={(value) => setcategory(value)}>
          <SelectTrigger className="w-[180px] sm:w-full bg-Dark-Charcoal-Gray border-none text-white">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent className="bg-dark text-white border-none">
            <SelectItem value={"all"}>{"Tout"}</SelectItem>
            {uniqueCategories.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setinventoryId(value)}>
          <SelectTrigger className="w-[180px] sm:w-full bg-Dark-Charcoal-Gray border-none text-white">
            <SelectValue className="capitalize" placeholder="Inventaire" />
          </SelectTrigger>
          <SelectContent className="bg-dark text-white border-none">
            <SelectItem className="capitalize" value={"all"}>
              {"Tout"}
            </SelectItem>
            {inventories?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-[180px] sm:w-full bg-Dark-Charcoal-Gray border-none text-white">
            <SelectValue className="capitalize" placeholder="Statut" />
          </SelectTrigger>
          <SelectContent className="bg-dark text-white border-none">
            <SelectItem className="capitalize" value={"all"}>
            {"Tout"}
            </SelectItem>
            {status?.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
