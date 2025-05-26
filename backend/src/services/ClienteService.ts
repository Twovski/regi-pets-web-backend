import { ClienteRepoLogger } from "#libs/decorator/ClienteRepoLogger";
import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";
import { IClienteRepo } from "#libs/interfaces/Clientes/IClienteRepo";
import { Prisma } from "#models/index";
import { ClienteRepo } from "#root/repository/ClienteRepo";
import { VeterinariaRepo } from "#root/repository/VeterinariaRepo";

export class ClienteService {
    private repository: IClienteRepo;
    private veterinaria_repo: VeterinariaRepo;
    
    constructor() {
        this.repository = new ClienteRepoLogger(new ClienteRepo());
        this.veterinaria_repo = new VeterinariaRepo();
    }

    async ActualizarCliente(cliente: ClienteDTO, cteID: number) {
        const result = await this.repository.obtener(cteID, cliente.VetID);
        if(!result)
            throw new Error('Cliente no encontrado');

        return this.repository.actualizar(cliente, cteID);
    }

    async BorrarCliente(cteID: number, vetID: number){
        const client = await this.repository.obtener(cteID, vetID);
        if(!client)
            throw new Error('Cliente no encontrado');

        return this.repository.borrar(cteID, vetID);
    }

    async BuscarCliente(cliente: ClienteDTO){
        const where: Prisma.clienteWhereInput = {};

        if (cliente.Status !== undefined)
            where.Status = cliente.Status;
        else 
            where.Status = true;
        
        if (cliente.Nombre)
            where.Nombre = { startsWith: cliente.Nombre };
        if (cliente.Apellido_Pat)
            where.Apellido_Pat = { startsWith: cliente.Apellido_Pat };
        if (cliente.Apellido_Mat)
            where.Apellido_Mat = { startsWith: cliente.Apellido_Mat };
        if (cliente.Direccion)
            where.Direccion = { startsWith: cliente.Direccion };
        if (cliente.Correo)
            where.Correo = { startsWith: cliente.Correo };
        if (cliente.Telefono)
            where.Telefono = { startsWith: cliente.Telefono };
        if (cliente.Celular)
            where.Celular = { startsWith: cliente.Celular };
    
        return this.repository.buscar(where)
    }


    async CrearCliente(cliente: ClienteDTO){
        const [veterinaria, exist] = await Promise.all([
            this.veterinaria_repo.obtener(cliente.VetID),
            this.repository.buscar({ OR: [
                    { Correo: cliente.Correo },
                    { CURP: cliente.CURP }
                ]
            })
        ]);
        if(!veterinaria)
            throw new Error("Veterinaria no encontrado");
        if(exist)
            throw new Error("El cliente ya está registrado");

        return this.repository.crear(cliente);
    }

    async ListaCliente(vetID: number){
        return this.repository.lista(vetID);
    }

    async ObtenerCliente(cliID: number, vetID:number){
        return this.repository.obtener(cliID, vetID);
    }
}