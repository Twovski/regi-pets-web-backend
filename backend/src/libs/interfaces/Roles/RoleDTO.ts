import { z } from 'zod';

export const RolSchema = z.object({
  RolID: z.number().int().nonnegative().optional(),
  Nombre: z.string().max(255)
});

export type RoleDTO = z.infer<typeof RolSchema>;
export const RoleBusquedaSchema = RolSchema.partial();