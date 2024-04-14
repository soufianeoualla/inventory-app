import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
export const EditDelete = () => {
  return (
    <>
       <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-x-3 rounded-3xl font-bold">
        <BsThreeDots />
            </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-dark border-none shadow-md space-y-4 w-[190px] flex flex-col items-start">
        <Button variant={'secondary'}>Edit Article</Button>
        <Button className="text-white" variant={'destructive'}>Delete Article</Button>
      </PopoverContent>
    </Popover>
    </>
  );
};
