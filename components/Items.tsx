"use client";
import React, { Suspense } from "react";
import { SingleItem } from "./SingleItem";
import Loading from "./loading";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";
import { respone } from "./PageWrapper";

interface SingleItemProp {
  type: string;
  items: respone[] | undefined | null;
}
export const Items = ({ type, items }: SingleItemProp) => {
  return (
    <div className="w-[700px] mx-auto uppercase text-[13px]">
      <Suspense>
        {!items && (
          <div className="flex items-center justify-center h-[70vh]">
            <Loading />
          </div>
        )}

        {items?.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[60vh] text-center">
            <Image src={ullistration} alt="ullistration empty" />
            <h1 className="text-2xl font-bold mt-8 text-white">
              There is nothing here
            </h1>
          </div>
        )}
        {items?.map((item) => (
          <SingleItem key={item.id} type={type} item={item} />
        ))}
      </Suspense>
    </div>
  );
};
