import { IVeterinariaRepo } from "#libs/interfaces/Veterinaria/IVeterinariaRepo";
import { VeterinariaDTO } from "#libs/interfaces/Veterinaria/VeterinariaDTO";
import { Singleton } from "#libs/utils/singleton";
import { veterinaria, Prisma } from "#models/index";

export class VeterinariaRepo implements IVeterinariaRepo {
    private prisma = Singleton.prisma;

    async actualizar(veterinaria: VeterinariaDTO, VetID: number): Promise<veterinaria> {
        return this.prisma.veterinaria.update({
            data: veterinaria,
            where: {
                VetID: VetID
            }
        });
    }
    
    async borrar(VetID: number): Promise<veterinaria> {
        return this.prisma.veterinaria.update({
            data: {
                Status: false
            },
            where: { 
                VetID: VetID
            }
        });
    }

    async buscar(where: Prisma.veterinariaWhereInput): Promise<veterinaria[]> {
        return this.prisma.veterinaria.findMany({ where });
    }

    async crear(veterinaria: VeterinariaDTO): Promise<veterinaria> {
        return this.prisma.veterinaria.create({
            data: {
                Nombre: veterinaria.Nombre,
                Codigo_Postal: veterinaria.CodigoPostal,
                Contacto: veterinaria.Contacto,
                Domicilio: veterinaria.Domicilio,
                Status: veterinaria.Status
            }
        });
    }

    async lista(): Promise<veterinaria[]> {
        return this.prisma.veterinaria.findMany();
    }

    async obtener(VetID: number): Promise<veterinaria> {
        return this.prisma.veterinaria.findUnique({
            where: {
                VetID: VetID
            }
        })
    }
    
}