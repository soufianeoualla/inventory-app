import { MdChevronRight } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";

interface SingleItemProp {
  type: string;
}

export const SingleItem = ({ type }: SingleItemProp) => {
  const pathname = type === "sortie" ? `/sortie/${"id"}` : `/achat/${"id"}`;
  return (
    <Link href={pathname} className="w-full">
      <div className="w-full mb-4 flex justify-between pr-3 pl-8  items-center h-[72px] rounded-lg shadow-sm hover:border-primary hover:border cursor-pointer bg-Dark-Charcoal-Gray   ">
        <div className="flex items-center justify-between gap-x-16 ">
          <b className=" uppercase text-white   ">
            <span className="text-Subtle-Turquoise  ">#</span>
            {"id"}
          </b>
          <p className=" text-Slate-Blue ">{"date"}</p>
          <p className=" text-white   ">{"supplier"}</p>
          <p className=" text-white   ">{"article name"}</p>
        </div>

        <div className="flex items-center   ">
          <b className=" mr-8   text-white  ">{"quantity"}</b>
          <b className=" mr-8   text-white  ">{"price"}</b>
          <b className=" mr-8   text-white  ">{"total"}</b>

          <div
            className={`w-[104px] h-10  bg-opacity-10 rounded-md flex items-center justify-center gap-2 ${"statusColors"} `}
          >
            <div className={`w-2 h-2 rounded-full ${"statusColors"} `} />
            <b className={` capitalize tracking-wide`}>{"Category"}</b>
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
  );
};
