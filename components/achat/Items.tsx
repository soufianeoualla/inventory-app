import React, { Suspense } from "react";
import { SingleItem } from "./SingleItem";

export const Items = () => {
  return (
    <div className="w-[900px] mx-auto uppercase text-[13px]">
      <div className="w-full mb-4 flex justify-between pr-3 pl-8 items-center    ">
        <div className="flex items-center justify-between gap-x-16 ">
          <b className="text-dark  text-white   ">
            <span className="text-Subtle-Turquoise  ">#</span>
            {"id"}
          </b>
          <b className=" text-white ">{"date"}</b>
          <b className=" text-white   ">{"founisseur"}</b>
          <b className=" text-white   ">{"article name"}</b>
        </div>

        <div className="flex items-center   ">
          <b className=" mr-8 text-dark  text-white  ">{"quantity"}</b>
          <b className=" mr-8 text-dark  text-white  ">{"price"}</b>
          <b className=" mr-8 text-dark  text-white  ">{"total"}</b>

          <div className={`w-[144px] text-center  `}>
            <b className={` capitalize tracking-wide text-white`}>
              {"Category"}
            </b>
          </div>
        </div>
      </div>
      <Suspense>
        <SingleItem />
      </Suspense>
    </div>
  );
};
