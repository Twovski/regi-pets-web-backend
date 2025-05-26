import { PermisosRecepcionista } from "#libs/constants/Permisos";
import { RolMedico } from "#libs/constants/RolMedico.enum";
import { RolSchema } from "#libs/interfaces/Roles/RoleDTO";
import { Response, Request, NextFunction } from "express";

export class RoleMiddleware {
    ValidarPermisos(permisos: RolMedico[]){
        return (req: Request, res: Response, next: NextFunction) => {
            const role = req.session.Rol as RolMedico;
            if(!permisos.includes(role)){
                res.status(401).json({
                    message: 'No tienes permisos para acceder a esta funcionalidad.'
                });
                return;
            }
            
            next();
        }
        
    }
}