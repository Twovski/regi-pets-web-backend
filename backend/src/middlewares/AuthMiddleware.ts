import { SessionDTO } from "#libs/interfaces/Auth/SessionDTO";
import { Response, Request, NextFunction } from "express";
import  jwt from "jsonwebtoken";

export class AuthMiddleware {
    GetSession(req: Request, res: Response, next: NextFunction){
        const token = req.cookies.access_token;
        req.session = token;
        
        try{
            const data = jwt.verify(token, process.env.JWT_KEY) as SessionDTO;
            req.session = data;
        }
        catch {}

        next();
    }

    CheckValidateSession(req: Request, res: Response, next: NextFunction) {
        if (!req.session) {
            res.status(401).send('No tienes una sesión activa. Por favor, inicia sesión para continuar.');
            return;
        }
        next();
    }
}