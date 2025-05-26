import { ClienteRepoLogger } from "#libs/decorator/ClienteRepoLogger";
import { MascotaRepoLogger } from "#libs/decorator/MascotaRepoLogger";
import { IClienteRepo } from "#libs/interfaces/Clientes/IClienteRepo";
import { IMascotaRepo } from "#libs/interfaces/Mascotas/IMascotaRepo";
import { MascotaDTO } from "#libs/interfaces/Mascotas/MascotaDTO";
import { Prisma } from "#models/index";
import { AreaRepo } from "#root/repository/AreaRepo";
import { ClienteRepo } from "#root/repository/ClienteRepo";
import { EspecieRepo } from "#root/repository/EspecieRepo";
import { MascotaRepo } from "#root/repository/MascotaRepo";

export class MascotaService {
    private repository: IMascotaRepo;
    private area_repo: AreaRepo;
    private especie_repo: EspecieRepo;
    private cliente_repo: IClienteRepo;

    constructor() {
        this.repository = new MascotaRepoLogger(new MascotaRepo());
        this.area_repo = new AreaRepo();
        this.especie_repo = new EspecieRepo();
        this.cliente_repo = new ClienteRepoLogger(new ClienteRepo());
    }

    async ActualizarMascota(mascota: MascotaDTO, petID: number, vetID: number) {
        const result = await this.repository.obtener(petID, vetID);
        if(!result)
            throw new Error('Mascota no encontrado');

        return this.repository.actualizar(mascota, petID, vetID);
    }

    async BorrarMascota(petID: number, vetID: number){
        const client = await this.repository.obtener(petID, vetID);
        if(!client)
            throw new Error('Mascota no encontrado');

        return this.repository.borrar(petID, vetID);
    }

    async BuscarMascota(mascota: MascotaDTO, vetID:number){
        const where: Prisma.mascotaWhereInput = {};

        where.cliente_mascota = {
            every: { 
                cliente: { VetID: vetID }
            }
        };

        if (mascota.Status !== undefined)
            where.Status = mascota.Status;
        else
            where.Status = true;

        if (mascota.Nombre)
            where.Nombre = { startsWith: mascota.Nombre };
        if (mascota.Especie !== undefined)
            where.Especie = mascota.Especie;
        if (mascota.Raza)
            where.Raza = { startsWith: mascota.Raza };
        if (mascota.Color)
            where.Color = { startsWith: mascota.Color };
        if (mascota.Sexo)
            where.Sexo = { startsWith: mascota.Sexo };
        if (mascota.Peso !== undefined)
            where.Peso = mascota.Peso;
        if (mascota.FechaNacimiento !== undefined)
            where.Fecha_Nacimiento = mascota.FechaNacimiento;
        if (mascota.AreaID !== undefined)
            where.AreaID = mascota.AreaID;
    
        return this.repository.buscar(where)
    }

    async CrearMascota(mascota: MascotaDTO, vetID: number){
        const [area, especie, cliente, exist] = await Promise.all([
            this.area_repo.obtener(mascota.AreaID),
            this.especie_repo.obtener(mascota.Especie),
            this.cliente_repo.obtener(mascota.CliID, vetID),
            this.repository.buscar({ AND: [
                    { Nombre: mascota.Nombre },
                    { Fecha_Nacimiento: mascota.FechaNacimiento }
                ]
            })
        ]);

        if(!area)
            throw new Error("Area no encontrado");
        if(!especie)
            throw new Error("Especie no encontrado");
        if(!cliente)
            throw new Error("Cliente no encontrado");
        if(exist)
            throw new Error("La mascota ya está registrada");

        return this.repository.crear(mascota);
    }

    async ListaMascota(vetID: number){
        return this.repository.lista(vetID);
    }

    async ObtenerMascota(petID: number, vetID: number){
        return this.repository.obtener(petID, vetID);
    }
}