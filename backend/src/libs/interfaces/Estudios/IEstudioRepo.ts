import { estudio, Prisma } from "#models/index";

export interface IEstudioRepo {
    buscar(estudio: Prisma.estudioWhereInput): Promise<estudio[]>;
    lista(): Promise<estudio[]>;
}