import { z } from "zod";

export const EstudioSchema = z.object({
  EstID: z.number().int().nonnegative().optional(), // AUTO_INCREMENT
  Nombre: z.string().max(255),
});

export type EstudioDTO = z.infer<typeof EstudioSchema>;
export const EstudioBusquedaSchema = EstudioSchema.partial();