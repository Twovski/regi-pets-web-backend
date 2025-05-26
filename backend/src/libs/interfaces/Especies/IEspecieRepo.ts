import { especie, Prisma } from "#models/client";

export interface IEspecieRepo {
    buscar(where: Prisma.especieWhereInput): Promise<especie[]>;
    lista(): Promise<especie[]>;
    obtener(especieID: number): Promise<especie>;
}
