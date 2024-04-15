"use client";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AddEditAchat } from "./modals/AddEditAchat";
import { AddEditSortie } from "./modals/AddEditSortie";

export function AddButton() {
  const { addEditModal, toggle, settype, type } =
    useContext(AddEditModalContext);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="flex items-center gap-x-3 rounded-3xl font-bold"
          >
            <FaPlus />
            Ajouter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-dark border-none shadow-md space-y-4 w-[190px] flex flex-col items-center">
          <Button
            onClick={() => {
              toggle();
              settype("entree");
            }}
          >
            Ajouter un Entrée
          </Button>
          <Button
            onClick={() => {
              toggle();
              settype("sortie");
            }}
          >
            Ajouter un Sortie
          </Button>
        </PopoverContent>
      </Popover>

      {addEditModal && type === "entree" && (
        <AddEditAchat edit={false} operation={undefined} />
      )}
      {addEditModal && type === "sortie" && (
        <AddEditSortie edit={false} operation={undefined} />
      )}
    </>
  );
}
