import { Prisma, mascota } from "#models/client";
import { MascotaDTO } from "./MascotaDTO";
import { MascotaPayload } from "./MascotaPayload";

export interface IMascotaRepo {
    actualizar(mascota: MascotaDTO, petID: number, vetID: number): Promise<mascota>;
    borrar(petID: number, vetID: number): Promise<mascota>;
    buscar(mascota: Prisma.mascotaWhereInput): Promise<MascotaPayload[]>;
    crear(mascota: MascotaDTO): Promise<mascota>;
    lista(vetID: number): Promise<MascotaPayload[]>;
    obtener(petID: number, vetID: number): Promise<MascotaPayload>;
}
