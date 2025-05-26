import { ExpedienteDTO } from "#libs/interfaces/Expedientes/ExpedienteDTO";
import { Prisma } from "#models/index";
import { ExpedienteRepo } from "#root/repository/ExpedienteRepo";

export class ExpedienteService {
    private repository: ExpedienteRepo;
    constructor() {
        this.repository = new ExpedienteRepo();
    }
    
    async ActualizarExpediente(exp: ExpedienteDTO, folio: number){
        const result = await this.repository.obtener(folio);
        if(!result)
            throw new Error('Expediente no encontrado');

        return this.repository.actualizar(exp, folio);  
    }

    async BuscarExpediente(exp: ExpedienteDTO){
        const where: Prisma.expedienteWhereInput = {};
        
        if (exp.PetID)
            where.PetID = exp.PetID;
        if(exp.FechaCitaProx)
            where.FechaCitaProx = exp.FechaCitaProx;
    
        return this.repository.buscar(where)
    }

    async ObtenerExpediente(folio: number){
        return this.repository.obtener(folio);
    }
}