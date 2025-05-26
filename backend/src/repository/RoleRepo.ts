import { IRoleRepo } from "#libs/interfaces/Roles/IRoleRepo";
import { Singleton } from "#libs/utils/singleton";
import { rol, Prisma } from "#models/index";

export class RoleRepo implements IRoleRepo {
    private prisma = Singleton.prisma;

    async buscar(where: Prisma.rolWhereInput): Promise<rol[]> {
        return this.prisma.rol.findMany({ where });
    }

    async lista(): Promise<rol[]> {
        return this.prisma.rol.findMany();
    }
    
    async obtener(rolID: number): Promise<rol> {
        return this.prisma.rol.findUnique({
            where: { RolID: rolID }
        });
    }
    
}