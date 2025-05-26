import { IEspecieRepo } from "#libs/interfaces/Especies/IEspecieRepo";
import { Singleton } from "#libs/utils/singleton";
import { especie, Prisma } from "#models/index";

export class EspecieRepo implements IEspecieRepo {
    private prisma = Singleton.prisma;

    async buscar(where: Prisma.especieWhereInput): Promise<especie[]> {
        return this.prisma.especie.findMany({ where });
    }

    async lista(): Promise<especie[]> {
        return this.prisma.especie.findMany();
    }
    
    async obtener(espID: number): Promise<especie> {
        return this.prisma.especie.findUnique({
            where: { EspID: espID }
        });
    }
    
}