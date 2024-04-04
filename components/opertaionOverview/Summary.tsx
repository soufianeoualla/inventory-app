import React from "react";

export const Summary = () => {
  //   const invoiceDate = new Date(invoice.invoiceDate);

  //   const paymentDueDate = new Date(invoiceDate);
  //   paymentDueDate.setDate(
  //     paymentDueDate.getDate() + parseInt(invoice.paymentDue)
  //   );
  return (
    <div className="my-6  rounded-lg p-12 bg-card/20 sm:mb-10  ">
      <div className="flex items-center justify-between sm:flex-col sm:gap-y-8 sm:justify-start sm:items-start">
        <div className="grid gap-y-2">
          <strong className=" uppercase text-white text-[15px]">
            <span className=" ">#</span>
            {/* {invoice.id} */}
          </strong>
          <span className=" text-[13px] font-medium text-card-foreground">
            {/* {invoice?.description} */}
          </span>
        </div>
        <div className=" text-[13px] font-medium text-right text-card-foreground sm:text-left">
          <div>
            {/* {invoice?.senderAddress[0]?.street} <br />
            {invoice?.senderAddress[0]?.city} <br />
            {invoice?.senderAddress[0]?.postCode} <br />
            {invoice?.senderAddress[0]?.country} */}
          </div>
        </div>
      </div>

      <div className=" flex gap-20   items-start mt-5 sm:flex-col sm:gap-10">
        <div className="flex gap-28 md:gap-20 ">
          <div className="space-y-8">
            <div className="grid gap-2">
              <span className=" text-[13px] font-medium text-card-foreground">
                Ajouter le
              </span>
              <strong className=" text-white text-[15px]">{"date"}</strong>
            </div>

            <div className="grid gap-2">
              <span className=" text-[13px] font-medium text-card-foreground">
                {/* Payment Due */}
              </span>
              {/* <strong className=" text-white text-[15px]">{"date"}</strong> */}
            </div>
          </div>

          <div className="grid gap-2 text-[13px]  text-card-foreground">
            <span className=" font-medium  "></span>
            <strong className="capitalize text-white text-[15px]">
              {/* {invoice.clientName} */}
            </strong>
            <p className=" font-medium ] ">
              {/* {invoice.clientAddress[0]?.street} <br />{" "}
              {invoice.clientAddress[0]?.city} <br />
              {invoice.clientAddress[0]?.postCode} <br />{" "}
              {invoice.clientAddress[0]?.country} */}
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <span className="text-[13px]  font-medium text-card-foreground">
           
          </span>
          <strong className=" text-white text-[15px] -tracking-tighter">
            {/* {invoice.clientEmail} */}
          </strong>
        </div>
      </div>

      <div className="p-8 bg-Dusty-Aqua rounded-lg mt-11 text-[15px]">
        <table className="w-full sm:hidden">
          <tr className="text-muted-foreground ">
            <th>item Name</th>
            <th>QTY.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
         
            <tr  className=" text-white">
              <td>
                {/* {item.itemName} */}
                name
                </td>
              <td className=" text-card-foreground">
                {/* {item.quantity} */}
                100
              </td>
              <td className=" text-card-foreground">
                {/* {formatPrice(item.price)} */}
                100
              </td>
              <td>
                {/* {formatPrice(item.total)} */}
                10000 dhs
                </td>
            </tr>
          
        </table>

      </div>
      
    </div>
  );
};
