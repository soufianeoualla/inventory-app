import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BsThreeDots } from "react-icons/bs";
import { EditDelete } from "../modals/EditDelete";
interface article {
  id: string;
  name: string;
  ref: number;
  quantity: number;
  category: string;
  inventoryId: string;
}

interface InventoryTableProp {
  article: article | undefined;
}
export const InventoryItem = ({ article }: InventoryTableProp) => {
  const inStock = article?.quantity! > 0;

  return (
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
       
        <EditDelete/>
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
        </div>
        <div>
          <span>Category: </span>
          <b>{article?.category}</b>
        </div>
      </CardContent>
    </Card>
  );
};
