import { Prisma } from "#models/index";
import { LoginDTO } from "./LoginDTO";

export interface IAuthRepo {
    getUser(correo: string): Promise<Prisma.sesionGetPayload<{
        include: {
            medico: { 
                include: { rol: true }
            }
        }
    }>>;

    getLogin(correo: string): Promise<LoginDTO>;
    changePassword(login: LoginDTO): Promise<void>;
}