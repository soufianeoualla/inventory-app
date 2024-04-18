"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { DeleteModal } from "../modals/DeleteModal";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { article } from "@prisma/client";


interface InventoryTableProp {
  article: article | undefined;
}
export const InventoryItem = ({ article }: InventoryTableProp) => {
  const [deleteModal, setdeleteModal] = useState<boolean>(false);

  const inStock = article?.quantity! > 0;

  return (
    <>
      <Card className="w-[600px] rounded-2xl bg-card/40 border-none shadow-xl">
        <div className="flex justify-between items-start p-6 relative">
          <div className="flex items-center gap-x-3 ">
            Ref: {article?.ref}
            <div
              className={`px-4 py-2 flex justify-center gap-x-2 items-center ${
                inStock
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "bg-destructive/15 text-destructive"
              } rounded-lg `}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  inStock ? "bg-emerald-500" : "bg-destructive"
                }`}
              />
              {inStock ? "In stock" : "Out of Stock"}
            </div>
          </div>
          <div className="z-0">
            <Button
              onClick={() => setdeleteModal(true)}
              className="text-white"
              variant={"destructive"}
              size={"icon"}
            >
              <MdDelete />
            </Button>{" "}
          </div>
        </div>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-x-4">
            <div>
              <span>Article: </span>
              <b>{article?.name}</b>
            </div>
            <div>
              <span>Quantity: </span>
              <b>{article?.quantity}</b>
            </div>
            <div>
              <span>Price Unitaire: </span>
              <b>{article?.price.toFixed(2)}</b>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
          <div>
            <span>Total: </span>
            <b>{article?.total.toFixed(2)}</b>
          </div>
          <div>
            <span>Category: </span>
            <b>{article?.category}</b>
          </div>

          </div>
        </CardContent>
      </Card>

      {deleteModal && (
        <DeleteModal
          id={article?.id!}
          setDeleteModal={setdeleteModal}
          type="article"
        />
      )}
    </>
  );
};
