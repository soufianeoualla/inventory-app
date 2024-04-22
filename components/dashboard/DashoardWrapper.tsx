"use client";
import { getAllOperations, getInventories } from "@/data/inventory";
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
import { operation } from "@prisma/client";
import { compareDates, isInRangeDate } from "@/lib/functions";
import { subDays } from "date-fns";

export const DashoardWrapper = () => {
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  const [inventoryId, setinventoryId] = useState<string | null>();
  const [operations, setoperations] = useState<operation[] | null>();
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
    }
  }, [inventoryId]);

  const entree = operations?.filter((item) => item.type === "entree");
  const sortie = operations?.filter((item) => item.type === "sortie");
  const invetaireName = operations?.map((item) => item.inventoryName);
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

  return (
    <div className="px-8 mt-10 ">
      <div className="flex justify-between  items-center mb-8">
        {invetaireName && (
          <h1 className="text-white font-bold text-xl sm:text-lg">
            Inventaire: <span className="capitalize">{invetaireName[0]}</span>
          </h1>
        )}
        <div className="flex justify-end ">
          <Select onValueChange={(value) => setinventoryId(value)}>
            <SelectTrigger className="w-[180px] sm:w-[120px] bg-Dark-Charcoal-Gray border-none text-white">
              <SelectValue className="capitalize" placeholder="Inventaire" />
            </SelectTrigger>
            <SelectContent className="bg-dark text-white border-none">
              <SelectItem className="capitalize" value={"all"}>
                {"All"}
              </SelectItem>
              {inventories?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
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
