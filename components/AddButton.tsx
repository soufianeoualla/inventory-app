import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaPlus } from "react-icons/fa6";

export function AddButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="flex items-center gap-x-3 rounded-3xl font-bold">
            <FaPlus/>
            Ajouter</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-Dark-Charcoal-Gray border-none shadow-md space-y-4 w-[190px] flex flex-col items-center">
        <Button>Ajouter un achat</Button>
        <Button>Ajouter un sortie</Button>
      </PopoverContent>
    </Popover>
  );
}
