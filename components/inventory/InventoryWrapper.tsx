import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getInventory } from "@/data/inventory";
import Loading from "../loading";
import { InventoryTable } from "./inventoryTable";

export const InventoryWrapper = async () => {
  const inventory = await getInventory();
  const articles = inventory?.article;

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
        <Button>Add a product</Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-start items-center">
        {articles ? <InventoryTable articles={articles} /> : <Loading />}
      </div>
    </div>
  );
};
