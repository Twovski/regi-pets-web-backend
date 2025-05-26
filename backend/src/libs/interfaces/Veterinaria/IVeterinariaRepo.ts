import { Prisma, veterinaria } from "#models/client";
import { VeterinariaDTO } from "./VeterinariaDTO";

export interface IVeterinariaRepo {
    actualizar(veterinaria: VeterinariaDTO, VetID: number): Promise<veterinaria>;
    borrar(VetID: number): Promise<veterinaria>;
    buscar(veterinaria: Prisma.veterinariaWhereInput): Promise<veterinaria[]>;
    crear(veterinaria: VeterinariaDTO): Promise<veterinaria>;
    lista(): Promise<veterinaria[]>;
    obtener(VetID: number): Promise<veterinaria>;
}
