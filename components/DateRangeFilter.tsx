"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { fr } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  className?: React.HTMLAttributes<HTMLDivElement> | undefined;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange|undefined>>;
}

export function DateRangeFilter({
  className,
  date,
  setDate,
}: DateRangeFilterProps) {
  return (
    <div className={cn("grid gap-2 sm:w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] sm:w-full justify-start text-left font-normal bg-Dark-Charcoal-Gray text-white border-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Sélectionnez une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-Dark-Charcoal-Gray bg-dark "
          align="start"
        >
          <Calendar
            className=""
            initialFocus
            mode="range"
            locale={fr}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
