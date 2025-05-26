import { z } from "zod";

export const ExpedienteSchema = z.object({
  PetID: z.number().nonnegative(),
  FechaCitaProx: z.date()
});

export type ExpedienteDTO = z.infer<typeof ExpedienteSchema>;
export const ExpedienteBusquedaSchema = ExpedienteSchema.partial();