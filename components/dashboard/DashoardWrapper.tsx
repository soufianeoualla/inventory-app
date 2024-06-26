"use client";
import {
  getAllOperations,
  getInventories,
  getInventory,
} from "@/data/inventory";
import { PurchaseOverview } from "./PurchaseOverview";
import { AreaChartComponent } from "./AreaChart";
import { SortieOverview } from "./SortieOverview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inventories } from "../inventory/InventoryList";
import { useEffect, useState } from "react";
import { inventory, operation } from "@prisma/client";
import { compareDates, isInRangeDate } from "@/lib/functions";
import { subDays } from "date-fns";
import Loading from "../loading";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";
import { Button } from "../ui/button";
import Link from "next/link";

export const DashoardWrapper = () => {
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  const [inventoryId, setinventoryId] = useState<string | null>();
  const [operations, setoperations] = useState<operation[] | null>();
  const [inventory, setinventory] = useState<inventory | null>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInventories();
      setinventories(response);
      if (response && response.length > 0) {
        setinventoryId(response[0].id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inventoryId) {
      getAllOperations(inventoryId).then(setoperations);
      getInventory(inventoryId).then(setinventory);
    }
  }, [inventoryId]);

  const entree = operations?.filter((item) => item.type === "entree");
  const sortie = operations?.filter((item) => item.type === "sortie");
  const today = new Date();
  const yesterday = subDays(today, 1);
  const lastWeek = subDays(today, 7);
  const lastMonth = subDays(today, 30);

  const dateItems = (
    operation: operation[],
    comparator: (date1: Date, date2: Date) => boolean,
    date: Date
  ) => {
    return operation?.filter((item) => comparator(item.date, date)) || [];
  };

  const todayItemsEntree = dateItems(entree!, compareDates, today);
  const yesterdayItemsEntree = dateItems(entree!, compareDates, yesterday);
  const lastWeekItemsEntree = dateItems(entree!, isInRangeDate, lastWeek);
  const lastMonthItemsEntree = dateItems(entree!, isInRangeDate, lastMonth);
  const todayItemsSortie = dateItems(sortie!, compareDates, today);
  const yesterdayItemsSortie = dateItems(sortie!, compareDates, yesterday);
  const lastWeekItemsSortie = dateItems(sortie!, isInRangeDate, lastWeek);
  const lastMonthItemsSortie = dateItems(sortie!, isInRangeDate, lastMonth);

  const calculateQuantityAndTotal = (items: operation[]) => {
    const quantity = items.reduce((acc, val) => acc + val.quantity, 0);
    const total = items.reduce((acc, val) => acc + val.total, 0);
    return { quantity, total };
  };

  const todayEntreeStats = calculateQuantityAndTotal(todayItemsEntree);
  const yesterdayEntreeStats = calculateQuantityAndTotal(yesterdayItemsEntree);
  const lastWeekEntreeStats = calculateQuantityAndTotal(lastWeekItemsEntree);
  const lastMonthEntreeStats = calculateQuantityAndTotal(lastMonthItemsEntree);

  const todaySortieStats = calculateQuantityAndTotal(todayItemsSortie);
  const yesterdaySortieStats = calculateQuantityAndTotal(yesterdayItemsSortie);
  const lastWeekSortieStats = calculateQuantityAndTotal(lastWeekItemsSortie);
  const lastMonthSortieStats = calculateQuantityAndTotal(lastMonthItemsSortie);

  if (inventories?.length === 0)
    return (
      <>
        {
          <div className="flex flex-col justify-center items-center h-[80vh] text-center">
            <Image src={ullistration} alt="ullistration empty" />
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-2xl font-bold mt-8 text-white">
                {"vous n'avez pas d'inventaire, créez-en un"}
              </h1>
              <Button variant={"link"} className="bg-white">
                <Link href={"/inventaire"}>{"créez-en un"}</Link>
              </Button>
            </div>
          </div>
        }
      </>
    );

  if (!operations)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="px-8 mt-10 ">
      <div className="flex justify-between  items-center mb-8">
        {inventory && (
          <h1 className="text-white font-bold text-xl sm:text-lg">
            Inventaire: <span className="uppercase">{inventory.name}</span>
          </h1>
        )}
        <div className="flex justify-end ">
          <Select onValueChange={(value) => setinventoryId(value)}>
            <SelectTrigger className="w-[180px] sm:w-[120px] bg-Dark-Charcoal-Gray border-none text-white">
              <SelectValue className="capitalize" placeholder="Inventaire" />
            </SelectTrigger>
            <SelectContent className="bg-dark text-white border-none">
              {inventories?.map((item) => (
                <SelectItem key={item.id} value={item.id} className="uppercase">
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <h1 className="text-white text-xl font-bold ">Entree</h1>
      <div className="flex justify-center items-center gap-x-8 mt-2 sm:grid  sm:gap-y-8">
        <PurchaseOverview
          date={"aujourd'hui"}
          quantity={todayEntreeStats.quantity}
          total={todayEntreeStats.total}
        />
        <PurchaseOverview
          date={"hier"}
          quantity={yesterdayEntreeStats.quantity}
          total={yesterdayEntreeStats.total}
        />
        <PurchaseOverview
          date={"7 derniers jours"}
          quantity={lastWeekEntreeStats.quantity}
          total={lastWeekEntreeStats.total}
        />
        <PurchaseOverview
          date={"30 derniers jours"}
          quantity={lastMonthEntreeStats.quantity}
          total={lastMonthEntreeStats.total}
        />
      </div>
      <h1 className="text-white text-xl font-bold mt-10 ">Sortie</h1>
      <div className="flex justify-center items-center gap-x-8 mt-2 sm:grid  sm:gap-y-8">
        <SortieOverview
          date={"aujourd'hui"}
          quantity={todaySortieStats.quantity}
          total={todaySortieStats.total}
        />
        <SortieOverview
          date={"hier"}
          quantity={yesterdaySortieStats.quantity}
          total={yesterdaySortieStats.total}
        />
        <SortieOverview
          date={"7 derniers jours"}
          quantity={lastWeekSortieStats.quantity}
          total={lastWeekSortieStats.total}
        />
        <SortieOverview
          date={"30 derniers jours"}
          quantity={lastMonthSortieStats.quantity}
          total={lastMonthSortieStats.total}
        />
      </div>
      <div className="flex items-center justify-center mt-10">
        {operations && <AreaChartComponent operations={operations} />}
      </div>
    </div>
  );
};
