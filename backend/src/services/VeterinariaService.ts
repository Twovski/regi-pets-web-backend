import { VeterinariaDTO } from "#libs/interfaces/Veterinaria/VeterinariaDTO";
import { Prisma } from "#models/index";
import { VeterinariaRepo } from "#root/repository/VeterinariaRepo";

export class VeterinariaService {
    private repository: VeterinariaRepo;
    constructor() {
        this.repository = new VeterinariaRepo();
    }
    
    async ActualizarVeterinaria(veterinaria: VeterinariaDTO, vetID: number) {
        const result = await this.repository.obtener(vetID);
        if(!result)
            throw new Error('Veterinaria no encontrado');
    
        return this.repository.actualizar(veterinaria, vetID);
    }
    
    async BorrarVeterinaria(vetID: number){
        const result = await this.repository.obtener(vetID);
        if(!result)
            throw new Error('Veterinaria no encontrado');
    
        return this.repository.borrar(vetID);
    }
    
    async BuscarVeterinaria(veterinaria: VeterinariaDTO){
        const where: Prisma.veterinariaWhereInput = {};
        
        if (veterinaria.Status !== undefined)
            where.Status = veterinaria.Status;
        else 
            where.Status = true;
        
        if (veterinaria.Nombre)
            where.Nombre = { startsWith: veterinaria.Nombre };
        if (veterinaria.Domicilio)
            where.Domicilio = { startsWith: veterinaria.Domicilio };
        if (veterinaria.CodigoPostal)
            where.Codigo_Postal = { startsWith: veterinaria.CodigoPostal };
        if (veterinaria.Contacto)
            where.Contacto = { startsWith: veterinaria.Contacto };
    
        return this.repository.buscar(where)
    }
    
    async CrearVeterinaria(veterinaria: VeterinariaDTO){
        return this.repository.crear(veterinaria)
    }
    
    async ListaVeterinaria(){
        return this.repository.lista();
    }

    async ObtenerVeterinaria(vetID: number){
        return this.repository.obtener(vetID);
    }
}