import React, { Suspense } from "react";
import { SingleItem } from "./SingleItem";

interface SingleItemProp {
  type: string;
}
export const Items = ({ type }: SingleItemProp) => {
  return (
    <div className="w-[900px] mx-auto uppercase text-[13px]">
      <div className="w-full mb-4 flex justify-between pr-3 pl-8 items-center text-muted-foreground    ">
        <div className="flex items-center justify-between gap-x-16 ">
          <b className="     ">
            <span className="text-Subtle-Turquoise  ">#</span>
            {"id"}
          </b>
          <b className=" ">{"date"}</b>
          <b className="   ">{"supplier"}</b>
          <b className="   ">{"article name"}</b>
        </div>

        <div className="flex items-center  ">
          <b className=" mr-8">{"quantity"}</b>
          <b className=" mr-8  ">{"price"}</b>
          <b className=" mr-8  ">{"total"}</b>

          <div className={`w-[144px] text-center  `}>
            <b className={` capitalize tracking-wide`}>{"Category"}</b>
          </div>
        </div>
      </div>
      <Suspense>
        <SingleItem type={type} />
      </Suspense>
    </div>
  );
};
