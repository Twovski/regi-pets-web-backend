import { z } from "zod";

export const ConsultaMedicoSchema = z.object({
  Medico: z.number().int().nonnegative(),
  Expediente: z.number().int().nonnegative()
});

export type ConsultaMedicoDTO = z.infer<typeof ConsultaMedicoSchema>;
