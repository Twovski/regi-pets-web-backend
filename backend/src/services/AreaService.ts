import { AreaDTO } from "#libs/interfaces/Area/AreaDTO";
import { Prisma } from "#models/index";
import { AreaRepo } from "#root/repository/AreaRepo";

export class AreaService {
    private repository: AreaRepo;

    constructor() {
        this.repository = new AreaRepo();
    }
    
    async BuscarArea(area: AreaDTO){
        const where: Prisma.areaWhereInput = {};
        
        if (area.Nombre)
            where.Nombre = { startsWith: area.Nombre };
    
        return this.repository.buscar(where)
    }
    
    async ListaArea(){
        return this.repository.lista();
    }

}