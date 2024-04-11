import React from "react";

import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface article{
    id: string;
    name: string;
    ref: number;
    quantity: number;
    category: string;
    inventoryId: string;
}

interface InventoryTableProp{
    articles : article[] | undefined
}

export const InventoryTable = ({ articles }:InventoryTableProp) => {
  return (
    <table className="w-[750px]  mx-auto  rounded-xl px-3 border  border-Slate-Blue/20">
      <tr className="text-white/70 capitalize font-bold text-xl px-4  ">
        <th>ref</th>
        <th>Article name</th>
        <th>Quantity</th>
        <th>Category</th>
        <th>Status</th>
        <th>action</th>
      </tr>

      {articles!.map((item:article) => (
        <tr
          key={item.id}
          className="h-16 border-b text-white border-Slate-Blue/20   px-4"
        >
          <td>{item.ref}</td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.category}</td>
          <td>{"in stock"}</td>
          <td className="flex h-full items-center gap-x-1">
            <Button size={"icon"} variant={"ghost"}>
              <FaEdit className="text-lg" />
            </Button>
            <Button
              variant={"ghost"}
              className="text-white hover:bg-destructive"
              size={"icon"}
            >
              <MdDelete className="text-lg" />
            </Button>
          </td>
        </tr>
      ))}
    </table>
  );
};
