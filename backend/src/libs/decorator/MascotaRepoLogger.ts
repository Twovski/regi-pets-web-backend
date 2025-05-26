import { IMascotaRepo } from "#libs/interfaces/Mascotas/IMascotaRepo";
import { MascotaDTO } from "#libs/interfaces/Mascotas/MascotaDTO";
import { MascotaPayload } from "#libs/interfaces/Mascotas/MascotaPayload";
import { mascota, Prisma } from "#models/index";

export class MascotaRepoLogger implements IMascotaRepo {
    constructor(private readonly repo: IMascotaRepo) {}

    async actualizar(mascota: MascotaDTO, petID: number, vetID: number): Promise<mascota> {
        console.log(`[LOG] Actualizando mascota con ID ${petID}`);
        return this.repo.actualizar(mascota, petID, vetID);
    }

    async borrar(petID: number, vetID: number): Promise<mascota> {
        console.log(`[LOG] Borrando mascota con ID ${petID}`);
        return this.repo.borrar(petID, vetID);
    }

    async buscar(where: Prisma.mascotaWhereInput): Promise<MascotaPayload[]> {
        console.log(`[LOG] Buscando mascotas con filtros:`, where);
        return this.repo.buscar(where);
    }

    async crear(mascota: MascotaDTO): Promise<mascota> {
        console.log(`[LOG] Creando mascota con datos:`, mascota);
        return this.repo.crear(mascota);
    }

    async lista(vetID: number): Promise<MascotaPayload[]> {
        console.log(`[LOG] Listando todas las mascotas`);
        return this.repo.lista(vetID);
    }

    async obtener(petID: number, vetID: number): Promise<MascotaPayload> {
        console.log(`[LOG] Obteniendo mascota con ID ${petID}`);
        return this.repo.obtener(petID, vetID);
    }
}