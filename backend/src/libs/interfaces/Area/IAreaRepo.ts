import { area, Prisma } from "#models/index";

export interface IAreaRepo {
    buscar(area: Prisma.areaWhereInput): Promise<area[]>;
    lista(): Promise<area[]>;
    obtener(areaID: number): Promise<area>;
}