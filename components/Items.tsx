"use client";
import { SingleItem } from "./SingleItem";
import Loading from "./loading";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";
import { operation } from "@prisma/client";
import { Button } from "./ui/button";
import { useState } from "react";

interface SingleItemProp {
  type: string;
  items: operation[] | undefined | null;
}
export const Items = ({ type, items }: SingleItemProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = items?.slice(firstItemIndex, lastItemIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items?.length! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;
  return (
    <div className="max-w-[910px] mx-auto uppercase text-[13px] sm:w-full">
      {!items && (
        <div className="flex items-center justify-center h-[70vh]">
          <Loading />
        </div>
      )}

      {items?.length === 0 && (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <Image src={ullistration} alt="ullistration empty" />
          <h1 className="text-2xl font-bold mt-8 text-white">
            Il n&lsquo;y a rien ici{" "}
          </h1>
        </div>
      )}
      {currentItems?.map((item) => (
        <SingleItem key={item.id} type={type} item={item} />
      ))}
      {currentItems && items?.length! > itemsPerPage && (
        <div className="flex items-center justify-end gap-x-4 sm:justify-center">
          <Button
            disabled={currentPage === 1}
            variant={"ghost"}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="text-white"
          >
            {"<"} Précédent
          </Button>
          <span className="text-white">
            Page {currentPage} / {lastPage}{" "}
          </span>
          <Button
            disabled={currentPage === lastPage}
            variant={"ghost"}
            onClick={() =>
              setCurrentPage((prev) => (prev < lastPage ? prev + 1 : prev))
            }
            className="text-white"
          >
            Suivant {">"}
          </Button>
        </div>
      )}
    </div>
  );
};
