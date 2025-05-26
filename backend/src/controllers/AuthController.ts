import { Response, Request, NextFunction } from "express";
import { LoginDTO, LoginSchema } from "#libs/interfaces/Auth/LoginDTO";
import jwt from "jsonwebtoken";
import { AuthService } from "#root/services/AuthService";
import { ChangePasswordDTO } from "#libs/interfaces/Auth/ChangePasswordDTO";

export class AuthController {
    private service: AuthService = new AuthService();

    constructor() {
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.Session = this.Session.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
    }

    async Login(req: Request, res: Response){
        const body = req.body as LoginDTO;
        try {
            const session = await this.service.login(body);
            const token = jwt.sign(session, process.env.JWT_KEY!, {
                expiresIn: '1h'
            });

            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60
                })
                .status(200)
                .json({ session, token });
        } catch (error) {
            res.status(401).json({
                message: 'Credenciales inválidas',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    Logout(req: Request, res: Response){
        res
            .clearCookie('access_token')
            .status(200)
            .json({ message: 'Sesión cerrada exitosamente' });
    }

    Session(req: Request, res: Response){
        const session = req.session;
        if (!session) {
            res.status(401).json({
                message: 'Acceso no autorizado'
            });
            return;
        }

        res.status(200).json(session);
    }

    async ChangePassword(req: Request, res: Response){
        const change = req.body as ChangePasswordDTO;
        change.Correo = req.session?.Correo;

        try {
            await this.service.changePassword(change);
            res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            res.status(400).json({
                message: 'No se pudo cambiar la contraseña',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}