import { ClienteMascotaDTO } from "#libs/interfaces/Cliente Mascota/ClienteMascotaDTO";
import { Prisma } from "#models/index";
import { ClienteMascotaRepo } from "#root/repository/ClienteMascotaRepo";

export class ClienteMascotaService {
    private repository: ClienteMascotaRepo;
    constructor() {
        this.repository = new ClienteMascotaRepo();
    }

    async ActualizarClienteMascota(cliente_mascota: ClienteMascotaDTO, buscar: ClienteMascotaDTO) {
        const result = await this.repository.obtener(buscar);
        if(!result)
            throw new Error('No existe este cliente');

        return this.repository.actualizar(cliente_mascota, buscar);
    }

    async BorrarClienteMascota(cliente_mascota: ClienteMascotaDTO){
        const client = await this.repository.obtener(cliente_mascota);
        if(!client)
            throw new Error('No existe este cliente');

        return this.repository.borrar(cliente_mascota);
    }

    async BuscarClienteMascota(cliente_mascota: ClienteMascotaDTO){
        const where: Prisma.cliente_mascotaWhereInput = {};

        if (cliente_mascota.Mascota !== undefined)
            where.Cliente = cliente_mascota.Cliente;
        if (cliente_mascota.Cliente !== undefined)
            where.Mascota = cliente_mascota.Mascota;

        return this.repository.buscar(where)
    }

    async CrearClienteMascota(cliente_mascota: ClienteMascotaDTO){
        return this.repository.crear(cliente_mascota)
    }
    
}