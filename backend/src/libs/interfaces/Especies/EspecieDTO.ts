import { z } from 'zod';

export const EspecieSchema = z.object({
  EspID: z.number().int().nonnegative().optional(),
  Nombre: z.string().max(255)
});

export type EspecieDTO = z.infer<typeof EspecieSchema>;
export const EspecieBusquedaSchema = EspecieSchema.partial();