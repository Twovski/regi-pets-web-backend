import { z } from "zod";

export const ConsultaSchema = z.object({
  Fecha: z.coerce.date(),
  Observaciones: z.string().nullable().optional(),
  Medico: z.number().int().nonnegative(),
  Expediente: z.number().int().nonnegative(),
});

export type ConsultaDTO = z.infer<typeof ConsultaSchema>;
export const ConsultaBusquedaSchema = ConsultaSchema.partial();