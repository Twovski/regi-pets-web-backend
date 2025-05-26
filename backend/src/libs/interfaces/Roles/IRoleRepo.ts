import { Prisma, rol } from "#models/client";

export interface IRoleRepo {
    buscar(role: Prisma.rolWhereInput): Promise<rol[]>;
    lista(): Promise<rol[]>;
    obtener(role: number): Promise<rol>;
}
