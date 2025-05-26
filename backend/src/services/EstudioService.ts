import { EstudioDTO } from "#libs/interfaces/Estudios/EstudioDTO";
import { Prisma } from "#models/index";
import { EstudioRepo } from "#root/repository/EstudioRepo";

export class EstudioService {
    private repository: EstudioRepo;

    constructor() {
        this.repository = new EstudioRepo();
    }
    
    async BuscarEstudio(estudio: EstudioDTO){
        const where: Prisma.estudioWhereInput = {};
        
        if (estudio.Nombre)
            where.Nombre = { startsWith: estudio.Nombre };
    
        return this.repository.buscar(where)
    }
    
    async ListaEstudio(){
        return this.repository.lista();
    }

}