import { operation } from "@prisma/client";
import { subDays } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export const formatPrice = (
  price: number,
  currency: string = "DHS",
  locale: string = "en-US"
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  const formattedPrice = formatter.formatToParts(price);
  const currencySymbol =
    formattedPrice.find((part) => part.type === "currency")?.value || "";

  const numberPart = formattedPrice
    .filter((part) => part.type !== "currency")
    .map((part) => part.value)
    .join("");

  const formattedPriceWithSymbolOnRight = numberPart + " " + currencySymbol;

  return formattedPriceWithSymbolOnRight;
};

export const compareDates = (date1: Date, date2: Date) => {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  return year1 === year2 && month1 === month2 && day1 === day2;
};
export const isInRangeDate = (date1: Date, date2: Date) => {
  return (
    date1 > date2 &&
    date1 < new Date() &&
    date1.getDate() < new Date().getDate()
  );
};


