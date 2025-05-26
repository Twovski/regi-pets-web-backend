import { ITratamientoRepo } from "#libs/interfaces/Tratamientos/ITratamientoRepo";
import { Singleton } from "#libs/utils/singleton";
import { Prisma, tratamiento } from "#models/index";

export class TratamientoRepo implements ITratamientoRepo {
    private prisma = Singleton.prisma;

    buscar(where: Prisma.tratamientoWhereInput): Promise<tratamiento[]> {
        return this.prisma.tratamiento.findMany({ where });
    }

    lista(): Promise<tratamiento[]> {
        return this.prisma.tratamiento.findMany();
    }

}