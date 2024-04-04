import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { AddButton } from "./AddButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = () => {
  return (
    <header className="flex items-center justify-end w-full h-20 px-8 border-b border-Charcoal-Blue shadow-sm bg-Dark-Charcoal-Gray gap-x-8">
      <AddButton />
      <div className="flex items-center gap-x-2 text-white">
        <b>Soufiane</b>
        <Popover>
          <PopoverTrigger>
            <FaCircleUser className="text-4xl " />
          </PopoverTrigger>
          <PopoverContent className="border-none p-0">
            <div className="h-11 flex items-center hover:bg-accent px-4 cursor-pointer">
              Profile
            </div>
            <div className="h-11 flex items-center hover:bg-accent px-4 cursor-pointer">
              Settings
            </div>
            <div className="h-11 flex items-center hover:bg-accent px-4 cursor-pointer">
              Log Out
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
