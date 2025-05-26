import { IClienteRepo } from "#libs/interfaces/Clientes/IClienteRepo";
import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";
import { cita, cliente, Prisma } from "#models/index";
import { IConsultaRepo } from "#libs/interfaces/Consultas/IConsultaRepo";
import { ConsultaDTO } from "#libs/interfaces/Consultas/ConsultaDTO";
import { ConsultaPayload } from "#libs/interfaces/Consultas/ConsultaPayload";

export class ConsultaRepoLogger implements IConsultaRepo {
    constructor(private readonly repo: IConsultaRepo) {}

    actualizar(update: Prisma.citaUpdateInput, citaID: number, vetID: number): Promise<cita> {
        console.log(`[LOG] Actualizando consulta ${citaID}`);
        return this.repo.actualizar(update, citaID, vetID);
    }

    buscar(where: Prisma.citaWhereInput): Promise<ConsultaPayload[]> {
        console.log(`[LOG] Buscando clientes con condición:`, where);
        return this.repo.buscar(where);
    }

    crear(consulta: ConsultaDTO): Promise<cita> {
        console.log(`[LOG] Creando consulta para expediente ${consulta.Expediente}`);
        return this.repo.crear(consulta);
    }

    lista(vetID: number): Promise<ConsultaPayload[]> {
        console.log(`[LOG] Obteniendo lista de consultas`);
        return this.repo.lista(vetID);
    }
    
    obtener(citaID: number, vetID: number): Promise<ConsultaPayload> {
        console.log(`[LOG] Obteniendo consulta ${citaID}`);
        return this.repo.obtener(citaID, vetID);
    }

    
}