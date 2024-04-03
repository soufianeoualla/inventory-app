import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeFilter } from "./DateRangeFilter";

export const Filters = () => {
  return (
    <div className="flex items-center justify-end gap-x-4">
      <DateRangeFilter />
      <Select>
        <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-Dark-Charcoal-Gray text-white border-none">
          <SelectItem value="light">1</SelectItem>
          <SelectItem value="dark">2</SelectItem>
          <SelectItem value="system">3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
