import { Prisma, medico } from "#models/client";
import { MedicoDTO } from "./MedicoDTO";

export interface IMedicoRepo {
    actualizar(medico: MedicoDTO, medID: number): Promise<medico>;
    borrar(medID: number, vetID: number): Promise<medico>;
    buscar(medico: Prisma.medicoWhereInput): Promise<medico[]>;
    crear(medico: MedicoDTO): Promise<medico>;
    lista(vetID: number): Promise<medico[]>;
    obtener(medID: number, vetID: number): Promise<medico>;
}
