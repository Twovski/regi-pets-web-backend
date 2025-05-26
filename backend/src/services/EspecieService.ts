import { EspecieDTO } from "#libs/interfaces/Especies/EspecieDTO";
import { Prisma } from "#models/index";
import { EspecieRepo } from "#root/repository/EspecieRepo";

export class EspecieService {
    private repository: EspecieRepo;
    constructor() {
        this.repository = new EspecieRepo();
    }
    
    async BuscarEspecie(especie: EspecieDTO){
        const where: Prisma.especieWhereInput = {};
        
        if (especie.Nombre)
            where.Nombre = { startsWith: especie.Nombre };
    
        return this.repository.buscar(where)
    }
    
    async ListaEspecie(){
        return this.repository.lista();
    }
}