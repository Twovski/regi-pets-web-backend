import { z } from "zod";

export const TratamientoSchema = z.object({
  TxID: z.number().int().nonnegative().optional(), // AUTO_INCREMENT
  Nombre: z.string().max(255),
});

export type TratamientoDTO = z.infer<typeof TratamientoSchema>;
export const TratamientoBusquedaSchema = TratamientoSchema.partial();