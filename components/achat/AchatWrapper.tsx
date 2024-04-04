"use client";
import { Filters } from "../Filters";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { useContext } from "react";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { AddEdit } from "../AddEdit";
import { Items } from "../Items";

export const AchatWrapper = () => {
  const { toggle, addEditModal } = useContext(AddEditModalContext);
  return (
    <>
      <div className="w-[900px] mx-auto space-y-16">
        <div className="flex justify-end items-center gap-x-8">
          <Filters />
          <Button
            onClick={toggle}
            className="flex items-center gap-x-2 font-bold"
          >
            <FaPlus />
            Ajouter un Entrée
          </Button>
        </div>
        <Items type="achat" />
      </div>

      {addEditModal && <AddEdit type="achat" />}
    </>
  );
};
