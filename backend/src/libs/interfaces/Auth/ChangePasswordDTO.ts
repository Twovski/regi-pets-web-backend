import { z } from "zod";

export const ChangePasswordSchema = z.object({
    Correo: z.string().email(),
    ViejaClave: z.string().min(8).max(16),
    Clave: z.string().min(8).max(16),
    Confirmar: z.string().min(8).max(16)
})

export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;