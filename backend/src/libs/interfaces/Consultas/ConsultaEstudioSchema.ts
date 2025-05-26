import { z } from "zod";

export const ConsultaEstudiosSchema = z.object({
  EstID: z.number().int().nonnegative(),
  Resultados: z.string().max(255),
});
