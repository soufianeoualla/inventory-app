import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
interface FiltersProps {
  uniqueCategories: Array<string>;
  setcategory: Dispatch<SetStateAction<string>>;
}

export const Filters = ({ uniqueCategories, setcategory }: FiltersProps) => {
  return (
    <Select onValueChange={(value) => setcategory(value)}>
      <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
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
  );
};
