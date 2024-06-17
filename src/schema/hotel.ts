import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, {
    message: "o campo deve ter pelo menos 5 caracteres",
  }),
  description: z.string().min(10, {
    message: "O campo deve ter pelo menos 10 caracteres",
  }),
  image: z.string().min(1, {
    message: "Campo obrigátorio",
  }),
  country: z.string().min(1, {
    message: "Campo obrigátorio",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "o campo deve ter pelo menos 10 caracteres",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPoll: z.boolean().optional(),
  coffeShop: z.boolean().optional(),
});
