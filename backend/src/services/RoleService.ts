import { RoleDTO } from "#libs/interfaces/Roles/RoleDTO";
import { Prisma } from "#models/index";
import { RoleRepo } from "#root/repository/RoleRepo";

export class RoleService {
    private repository: RoleRepo;
    constructor() {
        this.repository = new RoleRepo();
    }
    
    async BuscarRole(role: RoleDTO){
        const where: Prisma.rolWhereInput = {};
        
        if (role.Nombre)
            where.Nombre = { startsWith: role.Nombre };
    
        return this.repository.buscar(where)
    }
    
    async ListaRole(){
        return this.repository.lista();
    }
}