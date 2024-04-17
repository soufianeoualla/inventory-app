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
import { useEffect, useState } from "react";
import { article } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loading from "../loading";


export const InventoryWrapper = () => {
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
  }, [id]);
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
      <div className="px-8 mx-auto space-y-16">
        <div className="flex items-center gap-x-4 justify-end">
          <Select onValueChange={(value) => setcategory(value)}>
            <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
              <SelectValue placeholder="Category" />
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
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card text-white border-none">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="instock">In Stock</SelectItem>
              <SelectItem value="outOfStock">Out Of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {finalFilteredArticles?.map((item) => (
            <InventoryItem key={item.id} article={item} />
          ))}
        </div>
      </div>

      
    </>
  );
};
