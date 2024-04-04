import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  code: z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
  quantity: z.string().min(2, {
    message: "Quantity is Required",
  }),
  price: z.string().min(1, {
    message: "Price is Required",
  }),
});
