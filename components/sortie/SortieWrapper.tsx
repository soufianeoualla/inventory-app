"use client";
import React, { useContext } from "react";
import { Filters } from "../Filters";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { Items } from "../Items";
import { AddEditSortie } from "../modals/AddEditSortie";
import { NotificationContext } from "@/context/NotificationContext";
import { PopUpMessage } from "../modals/PopUpMessage";

export const SortieWrapper = () => {
  const { notification } = useContext(NotificationContext);
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
            Ajouter un Sortie
          </Button>
        </div>
        <Items type="sortie" />
      </div>
      {addEditModal && <AddEditSortie />}

      {notification && <PopUpMessage />}
    </>
  );
};
