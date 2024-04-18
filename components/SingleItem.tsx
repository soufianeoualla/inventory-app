import { MdChevronRight } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/functions";
import { getCategoryColor } from "@/lib/color";
import { entree } from "@prisma/client";

interface SingleItemProp {
  type: string;
  item: entree;
}

export const SingleItem = async ({ type, item }: SingleItemProp) => {
  const pathname = (id: string) => {
    return type === "sortie" ? `/sortie/${id}` : `/achat/${id}`;
  };

  return (
    <div>
      <Link key={item.id} href={pathname(item.id)} className="w-full">
        <div className="w-full mb-4 flex justify-between gap-x-16 pr-3 pl-8  items-center h-[72px] rounded-lg shadow-sm hover:border-primary hover:border cursor-pointer bg-card/60 text-white   ">
          <div className="flex items-center justify-between flex-1  ">
            <b className=" uppercase    ">#{item.id}</b>
            <p className="  ">{formatDate(item.date.toString())}</p>
            <div className="flex justify-center items-center gap-x-2">
              <div
                style={{
                  background: `hsla(${getCategoryColor(item.inventoryName)})`,
                }}
                className={`w-2 h-2 rounded-full `}
              />
              {item.inventoryName}
            </div>
            <p className="    ">{item.ref}</p>
            <p className="    ">{item.article}</p>
          </div>

          <div className="flex items-center   ">
            <b className=" mr-5     ">{item.quantity}</b>
            <b className=" mr-5     ">{formatPrice(item.price)}</b>
            <b className=" mr-5     ">{formatPrice(item.total)}</b>
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
              className="hover:bg-transparent "
            >
              <MdChevronRight className="text-primary text-xl" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
