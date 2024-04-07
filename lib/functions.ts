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
    currency: string = "USD",
    locale: string = "en-US"
  ) => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
    
      currency: currency,
    });
    return formatter.format(price);
  };