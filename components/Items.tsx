import React, { Suspense } from "react";
import { SingleItem } from "./SingleItem";

interface SingleItemProp {
  type: string;
}
export const Items = ({ type }: SingleItemProp) => {
  return (
    <div className="w-[900px] mx-auto uppercase text-[13px]">
      <div className="w-full mb-4 flex justify-between pr-3 pl-8 items-center    ">
        <div className="flex items-center justify-between gap-x-16 ">
          <b className="  text-white   ">
            <span className="text-Subtle-Turquoise  ">#</span>
            {"id"}
          </b>
          <b className=" text-white ">{"date"}</b>
          <b className=" text-white   ">{"supplier"}</b>
          <b className=" text-white   ">{"article name"}</b>
        </div>

        <div className="flex items-center   ">
          <b className=" mr-8   text-white  ">{"quantity"}</b>
          <b className=" mr-8   text-white  ">{"price"}</b>
          <b className=" mr-8   text-white  ">{"total"}</b>

          <div className={`w-[144px] text-center  `}>
            <b className={` capitalize tracking-wide text-white`}>
              {"Category"}
            </b>
          </div>
        </div>
      </div>
      <Suspense>
        <SingleItem type={type} />
      </Suspense>
    </div>
  );
};
