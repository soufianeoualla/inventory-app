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
  setinventoryId: Dispatch<SetStateAction<string>>;
  inventories: Inventories[] | null;
}

export const Filters = ({
  uniqueCategories,
  setcategory,
  inventories,
  setinventoryId,
}: FiltersProps) => {
 
  return (
    <>
    <div className="flex items-center w-full gap-x-4">

      <Select onValueChange={(value) => setcategory(value)}>
        <SelectTrigger className="w-[180px] sm:w-full bg-Dark-Charcoal-Gray border-none text-white">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-dark text-white border-none">
          <SelectItem value={"all"}>{"All"}</SelectItem>
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
          <SelectItem className="capitalize" value={"all"}>{"All"}</SelectItem>
          {inventories?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    </>
  );
};
