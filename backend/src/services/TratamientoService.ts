import { AreaDTO } from "#libs/interfaces/Area/AreaDTO";
import { TratamientoDTO } from "#libs/interfaces/Tratamientos/TratamientoDTO";
import { Prisma } from "#models/index";
import { AreaRepo } from "#root/repository/AreaRepo";
import { TratamientoRepo } from "#root/repository/TratamientoRepo";

export class TratamientoService {
    private repository: TratamientoRepo;

    constructor() {
        this.repository = new TratamientoRepo();
    }
    
    async BuscarTratamiento(tratamiento: TratamientoDTO){
        const where: Prisma.tratamientoWhereInput = {};
        
        if (tratamiento.Nombre)
            where.Nombre = { startsWith: tratamiento.Nombre };
    
        return this.repository.buscar(where)
    }
    
    async ListaTratamiento(){
        return this.repository.lista();
    }
    
}