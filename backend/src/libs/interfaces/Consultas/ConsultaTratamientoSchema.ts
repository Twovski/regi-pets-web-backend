import { z } from "zod";

export const ConsultaTratamientoSchema = z.object({
  TxID: z.number().int().nonnegative(),
  Dosis: z.string().max(255),
});

export type ConsultaTratamientoDTO = z.infer<typeof ConsultaTratamientoSchema>;