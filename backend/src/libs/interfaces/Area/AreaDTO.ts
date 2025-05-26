import { z } from "zod";

export const AreaSchema = z.object({
  AreaID: z.number().int().nonnegative().optional(), // AUTO_INCREMENT
  Nombre: z.string().max(255),
});

export type AreaDTO = z.infer<typeof AreaSchema>;
export const AreaBusquedaSchema = AreaSchema.partial();