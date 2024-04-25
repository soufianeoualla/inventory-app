"use client";
import { formatPrice } from "@/lib/functions";
import { operation } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

interface Props {
  operations: operation[];
}

export const AreaChartComponent = ({ operations }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const date = new Date();
  const dailyStatsMap = new Map();

  operations
    .filter(
      (item) =>
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear()
    )
    .forEach((item) => {
      const day = item.date.getDate();
      const existingEntry = dailyStatsMap.get(day);
      if (existingEntry) {
        // Update existing entry
        if (item.type === "entree") {
          existingEntry.entree = (existingEntry.entree || 0) + item.total;
        } else if (item.type === "sortie") {
          existingEntry.sortie = existingEntry.sortie + item.total;
        }
      } else {
        // Create new entry
        dailyStatsMap.set(day, {
          entree: item.type === "entree" ? item.total : 0,
          sortie: item.type === "sortie" ? item.total : 0,
        });
      }
    });

  const totalStats = Array.from(dailyStatsMap, ([day, stats]) => ({
    day,
    ...stats,
  }));

  return (
    <div className="max-w-[900px]  space-y-3 sm:w-full  ">
      <h1 className="text-white capitalize font-bold text-2xl ">
        Variation des prix Total
      </h1>
      <div className="flex items-center sm:grid sm:gap-y-8 w-full ">
        <ResponsiveContainer
          width={isMobile ? 300 : 600}
          height={isMobile ? 300 : 450}
        >
          <AreaChart data={totalStats} margin={{ right: 30 }}>
            <YAxis />
            <XAxis dataKey="day" />
            <CartesianGrid strokeDasharray="5 5" />

            <Tooltip content={<CustomTooltip color="text-blue-500" />} />
            <Legend />

            <Area
              type="monotone"
              dataKey="entree"
              stroke="#2563eb"
              fill="#3b82f6"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          width={isMobile ? 300 : 600}
          height={isMobile ? 300 : 450}
        >
          <AreaChart data={totalStats} margin={{ right: 30 }}>
            <YAxis />
            <XAxis dataKey="day" />
            <CartesianGrid strokeDasharray="5 5" />

            <Tooltip content={<CustomTooltip color="text-primary" />} />
            <Legend />

            <Area
              type="monotone"
              dataKey="sortie"
              stroke="#6930c3"
              fill="#7400b8"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface CustomTooltipProp {
  active?: boolean;
  payload?: any;
  label?: string;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  color,
}: CustomTooltipProp) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-200 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">Jour: {label}th</p>
        <p className={`text-sm ${color} `}>
          Total:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
