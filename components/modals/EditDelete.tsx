"use client";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";

interface EditDeleteProp {
  setdeleteModal: Dispatch<SetStateAction<boolean>>;
}
export const EditDelete = ({ setdeleteModal }: EditDeleteProp) => {
  const { toggle, settype } = useContext(AddEditModalContext);

  return (
    <>
      <Popover >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-x-3 rounded-3xl font-bold"
          >
            <BsThreeDots />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-dark border-none shadow-md space-y-4 w-[190px] flex flex-col items-start ">
          <Button
            onClick={() => {
              toggle();
              settype("article");
            }}
            variant={"secondary"}
          >
            Edit Article
          </Button>
          <Button
            onClick={() => setdeleteModal(true)}
            className="text-white"
            variant={"destructive"}
          >
            Delete Article
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};
