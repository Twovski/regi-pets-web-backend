import { IEstudioRepo } from "#libs/interfaces/Estudios/IEstudioRepo";
import { Singleton } from "#libs/utils/singleton";
import { Prisma, estudio } from "#models/index";

export class EstudioRepo implements IEstudioRepo {
    private prisma = Singleton.prisma;

    buscar(where: Prisma.estudioWhereInput): Promise<estudio[]> {
        return this.prisma.estudio.findMany({ where });
    }

    lista(): Promise<estudio[]> {
        return this.prisma.estudio.findMany();
    }

}