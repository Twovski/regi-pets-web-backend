import { z } from "zod";

export const ClienteMascotaSchema = z.object({
  Cliente: z.number().int().nonnegative(), // INT UNSIGNED
  Mascota: z.number().int().nonnegative()              // INT (puede ser negativo si no se especifica UNSIGNED)
});

export type ClienteMascotaDTO = z.infer<typeof ClienteMascotaSchema>;