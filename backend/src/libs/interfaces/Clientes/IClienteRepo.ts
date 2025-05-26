import { Prisma, cliente } from "#models/client";
import { ClienteDTO } from "./ClienteDTO";

export interface IClienteRepo {
    actualizar(cliente: ClienteDTO, cteID: number): Promise<cliente>;
    borrar(cteID: number, vetID: number): Promise<cliente>;
    buscar(cliente: Prisma.clienteWhereInput): Promise<cliente[]>;
    crear(cliente: ClienteDTO): Promise<cliente>;
    lista(vetID: number): Promise<cliente[]>;
    obtener(cteID: number, vetID: number): Promise<cliente>;
}
