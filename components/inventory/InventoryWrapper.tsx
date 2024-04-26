"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInventory } from "@/data/inventory";
import { InventoryItem } from "./InventoryItem";
import { useContext, useEffect, useState } from "react";
import {  article } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loading from "../loading";
import { TriggerContext } from "@/context/TriggerContext";
import { Button } from "../ui/button";
import { CompareQuantity } from "../modals/CompareQuantity";
import { AddEditModalContext } from "@/context/AddEditModalContext";

import GobackButton from "../GobackButton";

export const InventoryWrapper = () => {
  const { addEditModal, toggle, settype, type } =
    useContext(AddEditModalContext);
  const { trigger } = useContext(TriggerContext);
  const [articles, setarticles] = useState<article[] | undefined>();
  const [status, setstatus] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  useEffect(() => {
    const getData = async () => {
      const inventory = await getInventory(id);
      setarticles(inventory?.article);
    };
    getData();
  }, [id, trigger]);
  const categories = articles?.map((item) => item.category);
  const uniqueCategoriesSet = new Set(categories);
  const uniqueCategories: string[] = [];

  uniqueCategoriesSet.forEach((category) => {
    uniqueCategories.push(category);
  });

  const inStock = articles?.filter((item) => item.quantity > 0);
  const outOfStock = articles?.filter((item) => item.quantity === 0);
  const filteredArticles =
    status === "instock"
      ? inStock
      : status === "outOfStock"
      ? outOfStock
      : articles;
  const finalFilteredArticles = filteredArticles?.filter((item) => {
    if (category && category !== "all") {
      return item.category === category;
    } else return true;
  });
  if (!articles)
    return (
      <div className="flex items-center justify-center h-[80vh] ">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="px-8 mx-auto space-y-16 sm:px-4 sm:mx-0 mb-8">
        <div className="flex items-center justify-between sm:items-start mt-6 sm:relative">
          <GobackButton className="sm:top-0"/>
          <div className="flex items-center gap-4 justify-end flex-wrap sm:mt-20 sm:justify-start">
            <Select onValueChange={(value) => setcategory(value)}>
              <SelectTrigger className="w-[180px] sm:w-[150px] bg-Dark-Charcoal-Gray border-none text-white">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-card text-white border-none">
                <SelectItem value="all">All</SelectItem>
                {uniqueCategories?.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setstatus(value)}>
              <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-card text-white border-none">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="instock">En stock</SelectItem>
                <SelectItem value="outOfStock">En rupture de stock</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                toggle();
                settype("compare");
              }}
            >
              Comaprer l&lsquo;inventaire
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {finalFilteredArticles?.map((item) => (
            <InventoryItem key={item.id} article={item} />
          ))}
        </div>
      </div>

      {addEditModal && type === "compare" && (
        <CompareQuantity articles={articles} id={id} />
      )}
    </>
  );
};
