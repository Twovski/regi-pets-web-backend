import { MedicoDTO } from "#libs/interfaces/Medicos/MedicoDTO";
import { Prisma } from "#models/index";
import { MedicoRepo } from "#root/repository/MedicoRepo";
import { RoleRepo } from "#root/repository/RoleRepo";
import { VeterinariaRepo } from "#root/repository/VeterinariaRepo";

export class MedicoService {
    private repository: MedicoRepo;
    private veterinaria_repo: VeterinariaRepo;
    private role_repo: RoleRepo;

    constructor() {
        this.repository = new MedicoRepo();
        this.veterinaria_repo = new VeterinariaRepo();
        this.role_repo = new RoleRepo();
    }

    async ActualizarMedico(medico: MedicoDTO, medID: number) {
        const result = await this.repository.obtener(medID, medico.VetID);
        if(!result)
            throw new Error('Medico no encontrado');

        return this.repository.actualizar(medico, medID);
    }

    async BorrarMedico(medID: number, vetID: number){
        const client = await this.repository.obtener(medID, vetID);
        if(!client)
            throw new Error('Medico no encontrado');

        return this.repository.borrar(medID, vetID);
    }

    async BuscarMedico(medico: MedicoDTO){
        const where: Prisma.medicoWhereInput = {};

        if (medico.Status !== undefined)
            where.Status = medico.Status;
        else 
            where.Status = true;

        if (medico.Nombre)
            where.Nombre = { startsWith: medico.Nombre };
        if (medico.ApellidoPat)
            where.Apellido_Pat = { startsWith: medico.ApellidoPat };
        if (medico.ApellidoMat)
            where.Apellido_Mat = { startsWith: medico.ApellidoMat };
        if (medico.Direccion)
            where.Direccion = { startsWith: medico.Direccion };
        if (medico.Correo)
            where.Correo = { startsWith: medico.Correo };
        if (medico.Telefono)
            where.Telefono = { startsWith: medico.Telefono };
        if (medico.Celular)
            where.Celular = { startsWith: medico.Celular };
        if (medico.RFC !== undefined)
            where.RFC = medico.RFC;
        if (medico.RolID !== undefined)
            where.RolID = medico.RolID;
    

        return this.repository.buscar(where)
    }

    async CrearMedico(medico: MedicoDTO){
        const [veterinaria, role] = await Promise.all([
            this.veterinaria_repo.obtener(medico.VetID),
            this.role_repo.obtener(medico.RolID)
        ]);

        if(!veterinaria)
            throw new Error("Veterinaria no encontrado");
        if(!role)
            throw new Error("Rol no encontrado");

        return this.repository.crear(medico)
    }

    async ListaMedico(vetID: number){
        return this.repository.lista(vetID);
    }

    async ObtenerMedico(medID: number, vetID: number){
        return this.repository.obtener(medID, vetID);
    }
    
}