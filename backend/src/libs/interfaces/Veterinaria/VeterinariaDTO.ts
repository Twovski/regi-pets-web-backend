import { z } from 'zod';

export const VeterinariaSchema = z.object({
  Nombre: z.string().max(255),
  Domicilio: z.string().max(255),
  CodigoPostal: z.string().length(5),
  Contacto: z.string().max(255),
  Status: z.boolean()
});

export type VeterinariaDTO = z.infer<typeof VeterinariaSchema>;
export const VeterinariaBusquedaSchema = VeterinariaSchema.partial();