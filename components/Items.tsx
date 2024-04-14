"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { SingleItem } from "./SingleItem";
import { getEntree } from "@/data/entree";
import { getSortie } from "@/data/sortie";
import { TriggerContext } from "@/context/TriggerContext";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";

interface respone {
  id: string;
  ref: number;
  date: Date;
  createdAt: Date;
  email: string;
  article: string;
  category: string;
  quantity: number;
  inventoryId: string;
}

interface SingleItemProp {
  type: string;
}
export const Items = ({ type }: SingleItemProp) => {
  const [items, setitems] = useState<respone[] | null>();
  const { trigger } = useContext(TriggerContext);
  const pathname = usePathname();

  useEffect(() => {
    const getdata = async () => {
      const res = pathname.includes("achat")
        ? await getEntree()
        : await getSortie();
      setitems(res);
    };
    getdata();
  }, [trigger, pathname]);
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
        <SingleItem type={type} items={items!} />
      </Suspense>
    </div>
  );
};
