import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InventoryItemCard } from "./InventoryItemCard";
export const InventoryWrapper = () => {
  return (
    <div className="px-8 mx-auto space-y-16">
      <div className="flex items-center gap-x-4 justify-end">
        <Select>
          <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-card text-white border-none">
            <SelectItem value="light">1</SelectItem>
            <SelectItem value="dark">2</SelectItem>
            <SelectItem value="system">3</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-card text-white border-none">
            <SelectItem value="light">In Stock</SelectItem>
            <SelectItem value="dark">Out Of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-4 justify-start items-center">
        <InventoryItemCard />
        <InventoryItemCard />
        <InventoryItemCard />
        <InventoryItemCard /><InventoryItemCard />
      </div>
    </div>
  );
};
