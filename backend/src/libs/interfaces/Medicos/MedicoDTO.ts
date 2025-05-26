import { z } from "zod";

export const MedicoSchema = z.object({
  Nombre: z.string().max(255),
  ApellidoPat: z.string().max(255),
  ApellidoMat: z.string().max(255),
  Direccion: z.string().max(255),
  Correo: z.string().email().max(320),
  Telefono: z.string().max(255).nullable(),
  Celular: z.string().max(255).nullable(),
  RFC: z.string().toUpperCase().regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/,
    "RFC inválido. Debe tener entre 12 y 13 caracteres alfanuméricos con formato válido."
  ),
  Status: z.boolean(),
  RolID: z.number().int(),
  VetID: z.number().int().optional()
});

export type MedicoDTO = z.infer<typeof MedicoSchema>;
export const MedicoBusquedaSchema = MedicoSchema.partial();