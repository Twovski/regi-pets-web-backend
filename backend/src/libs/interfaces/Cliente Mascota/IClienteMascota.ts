import { Prisma, cliente_mascota } from "#models/client";
import { ClienteMascotaDTO } from "./ClienteMascotaDTO";

export interface IClienteMascotaRepo {
    actualizar(cliente_mascota: ClienteMascotaDTO, where: ClienteMascotaDTO): Promise<cliente_mascota>;
    borrar(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota>;
    buscar(cliente_mascota: Prisma.cliente_mascotaWhereInput): Promise<cliente_mascota[]>;
    crear(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota>;
    obtener(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota>;
}
