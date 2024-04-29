"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { DeleteModal } from "../modals/DeleteModal";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { article } from "@prisma/client";
import Link from "next/link";
import { formatPrice } from "@/lib/functions";
import { FaArrowUpLong } from "react-icons/fa6";

interface InventoryTableProp {
  article: article | undefined;
}
export const InventoryItem = ({ article }: InventoryTableProp) => {
  const [deleteModal, setdeleteModal] = useState<boolean>(false);

  const inStock = article?.quantity! > 0;

  return (
    <>
     
        <Card className="w-[600px] sm:w-full rounded-2xl bg-card/40 border-none shadow-xl hover:border-primary hover:border-2 hover:scale-105">
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
                  className={`w-2 h-2 rounded-full capitalize ${
                    inStock ? "bg-emerald-500" : "bg-destructive"
                  }`}
                />
                {inStock ? "en stock" : "en rupture de stock"}
              </div>
            </div >
            <div className="z-10 ">
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
          <CardContent className="space-y-4 relative">
            <div className="flex items-center gap-4 sm:flex-wrap">
              <div>
                <span>Article: </span>
                <b>{article?.name}</b>
              </div>
              <div>
                <span>Quantity: </span>
                <b>{article?.quantity}</b>
              </div>
              <div>
                <span>Prix Unitaire: </span>
                <b>{formatPrice(article?.price!)}</b>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:flex-wrap">
              <div>
                <span>Total: </span>
                <b>{formatPrice(article?.total!)}</b>
              </div>
              <div>
                <span>Category: </span>
                <b>{article?.category}</b>
              </div>
            </div>
            <Link
                href={`/inventaire/${article?.inventoryId!}/${article?.ref.toString()!}`}
                className="absolute right-6 bottom-6"
              >
                <div className="w-10 h-10 rounded-full text-dark bg-white flex justify-center items-center hover:scale-110 hover:bg-primary hover:text-white">
                  <FaArrowUpLong className=" rotate-45" />
                </div>
              </Link>
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
