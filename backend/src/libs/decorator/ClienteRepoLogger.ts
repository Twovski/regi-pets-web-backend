import { IClienteRepo } from "#libs/interfaces/Clientes/IClienteRepo";
import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";
import { cliente, Prisma } from "#models/index";

export class ClienteRepoLogger implements IClienteRepo {
    constructor(private readonly repo: IClienteRepo) {}

    async actualizar(cliente: ClienteDTO, cteID: number): Promise<cliente> {
        console.log(`[LOG] Actualizando cliente ${cteID}`);
        return this.repo.actualizar(cliente, cteID);
    }

    async borrar(cteID: number, vetID: number): Promise<cliente> {
        console.log(`[LOG] Borrando cliente ${cteID} de vet ${vetID}`);
        return this.repo.borrar(cteID, vetID);
    }

    async buscar(where: Prisma.clienteWhereInput): Promise<cliente[]> {
        console.log(`[LOG] Buscando clientes con condición:`, where);
        return this.repo.buscar(where);
    }

    async crear(cliente: ClienteDTO): Promise<cliente> {
        console.log(`[LOG] Creando cliente para vet ${cliente.VetID}`);
        return this.repo.crear(cliente);
    }

    async lista(vetID: number): Promise<cliente[]> {
        console.log(`[LOG] Obteniendo lista de clientes para vet ${vetID}`);
        return this.repo.lista(vetID);
    }

    async obtener(cteID: number, vetID: number): Promise<cliente> {
        console.log(`[LOG] Obteniendo cliente ${cteID} de vet ${vetID}`);
        return this.repo.obtener(cteID, vetID);
    }
}