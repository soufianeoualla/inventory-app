"use client";
import { MdChevronRight } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/functions";
import { generateBackgroundColor, getCategoryColor } from "@/lib/color";
import { operation } from "@prisma/client";
import { usePathname } from "next/navigation";

interface SingleItemProp {
  type: string;
  item: operation;
}

export const SingleItem = async ({ type, item }: SingleItemProp) => {
  const pathname = (id: string) => {
    return type === "sortie" ? `/sortie/${id}` : `/achat/${id}`;
  };
  const InventoryPath = usePathname().includes("inventaire");

  return (
    <div>
      <Link key={item.id} href={pathname(item.id)} className="w-full">
        <div
          className={`w-full mb-4 flex justify-between gap-x-16 pr-3 pl-8 sm:p-4  items-center h-[72px] sm:h-auto rounded-lg shadow-sm hover:border-primary hover:border cursor-pointer  text-white ${
            InventoryPath && item.type === "sortie"
              ? "bg-destructive/10"
              : " bg-card/60"
          }   `}
        >
          <div className="flex items-center justify-between flex-1 sm:flex-col sm:gap-y-2  ">
            <b className=" uppercase    ">#{item.id}</b>
            <p className="  ">{formatDate(item.date.toString())}</p>
            <div className="flex justify-center items-center gap-x-2">
              <div
                style={{
                  background: `${generateBackgroundColor(item.inventoryName)}`,
                }}
                className={`w-2 h-2 rounded-full `}
              />
              {item.inventoryName}
            </div>
            <p className="    ">{item.ref}</p>
            <strong className="">{item.article}</strong>
          </div>

          <div className="flex items-center sm:flex-col-reverse sm:gap-y-2  ">
            <b className=" mr-5 sm:mr-0     ">{item.quantity}</b>
            <b className=" mr-5 sm:mr-0     ">{formatPrice(item.price)}</b>
            <b className=" mr-5 sm:mr-0     ">{formatPrice(item.total)}</b>
            <div
              style={{
                background: `hsla(${getCategoryColor(item.category)}, 0.15)`,
              }}
              className={`w-[104px] h-10   rounded-md flex items-center justify-center gap-2  `}
            >
              <div
                style={{
                  background: `hsla(${getCategoryColor(item.category)})`,
                }}
                className={`w-2 h-2 rounded-full `}
              />
              <b
                style={{
                  color: `hsla(${getCategoryColor(item.category)})`,
                }}
                className={` capitalize tracking-wide`}
              >
                {item.category}
              </b>
            </div>

            <Button
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-transparent sm:hidden "
            >
              <MdChevronRight className="text-primary text-xl" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
