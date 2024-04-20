"use client";
import { useEffect, useState } from "react";
import { Items } from "./Items";
import { getEntree } from "@/data/entree";
import { getSortie } from "@/data/sortie";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
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
      <div className="w-[900px] mx-auto space-y-16">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              router.back();
            }}
            variant={"ghost"}
            className="flex items-center gap-6 font-bold hover:bg-transparent focus:text-primary hover:text-primary text-white "
          >
            <FaChevronLeft className="text-primary w-4 h-4  " />
            Go back
          </Button>

          <div className="flex justify-end items-center gap-x-4">
            <DateRangeFilter
              date={date}
              setDate={setDate}
              className={undefined}
            />
            <Select onValueChange={(value) => settype(value)}>
              <SelectTrigger className="w-[180px] bg-Dark-Charcoal-Gray border-none text-white">
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
