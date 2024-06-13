import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, {
    message: "O campo deve ter pelo menos 5 caracteres",
  }),
  description: z.string().min(10, {
    message: "O campo deve ter pelo menos 10 caracteres",
  }),
  bedCount: z.coerce.number().min(1, { message: "Campo obrigátorio!" }),
  guestCount: z.coerce.number().min(1, { message: "Campo obrigátorio!" }),
  bathroomCount: z.coerce.number().min(1, { message: "Campo obrigátorio!" }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, {
    message: "Campo obrigátorio!",
  }),
  beakFastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, {
    message: "Campo obrigátorio!",
  }),
  roomService: z.boolean().optional(),
  tv: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});
