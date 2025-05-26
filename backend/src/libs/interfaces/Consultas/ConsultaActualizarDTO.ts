import { z } from "zod";
import { ConsultaEstudiosSchema } from "./ConsultaEstudioSchema";
import { ConsultaTratamientoSchema } from "./ConsultaTratamientoSchema";

export const ConsultaActulizarSchema = z.object({
    Medico: z.number().int().nonnegative(),
    Expediente: z.number().int().nonnegative(),
    Observaciones: z.string(),
    Estudios: z.array(ConsultaEstudiosSchema),
    Tratamientos: z.array(ConsultaTratamientoSchema)
});

export type ConsultaActuaalizarDTO = z.infer<typeof ConsultaActulizarSchema>;