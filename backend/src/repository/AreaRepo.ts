import { IAreaRepo } from "#libs/interfaces/Area/IAreaRepo";
import { Singleton } from "#libs/utils/singleton";
import { area, Prisma } from "#models/index";

export class AreaRepo implements IAreaRepo {
    private prisma = Singleton.prisma;

    async buscar(where: Prisma.areaWhereInput): Promise<area[]> {
        return this.prisma.area.findMany({ where });
    }

    async lista(): Promise<area[]> {
        return this.prisma.area.findMany();
    }

    async obtener(areaID: number): Promise<area> {
        return this.prisma.area.findUnique({
            where: { AreaID: areaID }
        });
    }
}