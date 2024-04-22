"use client";
import { useEffect, useState } from "react";
import { Items } from "./Items";
import { usePathname } from "next/navigation";
import { DateRange } from "react-day-picker";
import { addDays, subDays } from "date-fns";
import { DateRangeFilter } from "./DateRangeFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getArticleOperations } from "@/data/inventory";
import { operation } from "@prisma/client";
import { Button } from "./ui/button";
import { FaChevronLeft } from "react-icons/fa6";
import GobackButton from "./GobackButton";

export const ActivitypageWrapper = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 15),
    to: addDays(new Date(), 7),
  });
  const [items, setitems] = useState<operation[] | null>();
  const [type, settype] = useState<string>("");
  const pathname = usePathname();
  const inventoryId = pathname.split("/")[2];
  const ref = pathname.split("/")[3];
  useEffect(() => {
    const getdata = async () => {
      const data = await getArticleOperations(ref, inventoryId);
      setitems(data);
    };
    getdata();
  }, [ref, inventoryId]);

  const filtredItemsByCategory = items?.filter((item) => {
    if (type && type !== "all") {
      return item.type === type;
    }
    return true;
  });

  const filtredItemsByTime = filtredItemsByCategory?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = date?.from ? new Date(date.from) : null;
    const toDate = date?.to ? new Date(date.to) : null;

    if (fromDate && toDate) {
      return (
        itemDate.getFullYear() >= fromDate.getFullYear() &&
        itemDate.getMonth() >= fromDate.getMonth() &&
        itemDate.getDate() >= fromDate.getDate() &&
        itemDate.getFullYear() <= toDate.getFullYear() &&
        itemDate.getMonth() <= toDate.getMonth() &&
        itemDate.getDate() <= toDate.getDate()
      );
    } else if (fromDate && !toDate) {
      return (
        itemDate.getFullYear() === fromDate.getFullYear() &&
        itemDate.getMonth() === fromDate.getMonth() &&
        itemDate.getDate() === fromDate.getDate()
      );
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="max-w-[900px] mx-auto space-y-16 mt-10">
        <div className="flex justify-between items-center sm:grid sm:relative">
          <GobackButton />

          <div className="flex justify-end items-center gap-4 flex-wrap sm:mt-20">
            <DateRangeFilter
              date={date}
              setDate={setDate}
              className={undefined}
            />
            <Select onValueChange={(value) => settype(value)}>
              <SelectTrigger className="w-[180px] sm:w-[150px] bg-Dark-Charcoal-Gray border-none text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-dark text-white border-none">
                <SelectItem value={"all"}>{"All"}</SelectItem>

                <SelectItem value={"entree"}>{"Entree"}</SelectItem>
                <SelectItem value={"sortie"}>{"Sortie"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Items type="achat" items={filtredItemsByTime} />
      </div>
    </>
  );
};
