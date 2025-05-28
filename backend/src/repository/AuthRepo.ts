import { IAuthRepo } from "#libs/interfaces/Auth/IAuthRepo";
import { LoginDTO } from "#libs/interfaces/Auth/LoginDTO";
import { Singleton } from "#libs/utils/singleton";

export class AuthRepo implements IAuthRepo {
    private prisma = Singleton.prisma;

    async getUser(correo: string){
        return this.prisma.sesion.findUnique({
            where: { Correo: correo },
            include: { 
                medico: {
                    include: { rol: true }
                } 
            }
        });
    }

    async getLogin(correo: string): Promise<LoginDTO> {
        return this.prisma.sesion.findUnique({
            where: {
                Correo: correo
            }
        })
    }

    async changePassword(login: LoginDTO): Promise<void> {
        await this.prisma.sesion.update({
            data: { Clave: login.Clave },
            where: { Correo: login.Correo }
        })
    }

}