import { z } from "zod";

export const LoginSchema = z.object({
    Correo: z.string().email(),
    Clave: z.string().min(8).max(16)
})

export type LoginDTO = z.infer<typeof LoginSchema>;