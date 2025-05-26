import { MedicoSchema } from "#libs/interfaces/Medicos/MedicoDTO";
import { Response, Request, NextFunction } from "express";
import { z } from "zod";

export class GlobalMiddleware {
    IDValidacion(req: Request, res: Response, next: NextFunction){
        const id = Number(req.params.id);
        if(isNaN(id) || id < 1){
            res.status(400).json({ error: 'ID inválido. Debe ser un número positivo.' });
            return;
        }

        next();
    }

    Validacion(schema: z.ZodTypeAny){
        return (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);
            if(!result.success){
                res.status(401).json({
                    message: 'Datos inválidos',
                    errors: result.error.flatten(),
                });
                return;
            }
            
            next();
        }
    }
}