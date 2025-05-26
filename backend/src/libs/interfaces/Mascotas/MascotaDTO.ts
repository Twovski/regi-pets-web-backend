import { z } from "zod";

export const MascotaSchema = z.object({
  Nombre: z.string().max(255),
  Especie: z.number().int(),
  Raza: z.string().max(255),
  Color: z.string().max(255),
  Sexo: z.string().max(255),
  Peso: z.number().nonnegative().max(999999.99),
  FechaNacimiento: z.coerce.date(),
  Status: z.boolean(),
  AreaID: z.number().int().nullable(),
  CliID: z.number().int().nonnegative()
});

export type MascotaDTO = z.infer<typeof MascotaSchema>;
export const MascotaBusquedaSchema = MascotaSchema.partial();