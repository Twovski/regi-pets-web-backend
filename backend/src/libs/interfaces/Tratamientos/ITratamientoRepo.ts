import { Prisma, tratamiento } from "#models/index";

export interface ITratamientoRepo {
    buscar(tratamiento: Prisma.tratamientoWhereInput): Promise<tratamiento[]>;
    lista(): Promise<tratamiento[]>;
}