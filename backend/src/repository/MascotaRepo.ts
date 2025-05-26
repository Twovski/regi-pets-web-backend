import { IMascotaRepo } from "#libs/interfaces/Mascotas/IMascotaRepo";
import { MascotaDTO } from "#libs/interfaces/Mascotas/MascotaDTO";
import { MascotaPayload } from "#libs/interfaces/Mascotas/MascotaPayload";
import { AES_256 } from "#libs/utils/AES-256";
import { Singleton } from "#libs/utils/singleton";
import { mascota, Prisma } from "#models/index";

export class MascotaRepo implements IMascotaRepo{
    private prisma = Singleton.prisma;

    actualizar(mascota: MascotaDTO, petID: number, vetID: number): Promise<mascota> {
        return this.prisma.mascota.update({
            data: mascota,
            where: {
                PetID: petID,
                Status: true,
                cliente_mascota: {
                    every: {
                        cliente: {
                            VetID: vetID
                        }
                    }
                }
            }
        });
    }

    async borrar(petID: number, vetID: number): Promise<mascota> {
        return this.prisma.mascota.update({
            data: {
                Status: false
            },
            where: { 
                PetID: petID,
                Status: true,
                cliente_mascota: {
                    every: {
                        cliente: {
                            VetID: vetID
                        }
                    }
                }
            }
        });
    }

    async buscar(where: Prisma.mascotaWhereInput): Promise<MascotaPayload[]> {
        return this.prisma.mascota.findMany({ 
            where,
            include: {
                expediente: true
            },
         });
    }

    async crear(mascota: MascotaDTO): Promise<mascota> {
        return this.prisma.$transaction(async (tx) => {
            const pet = await tx.mascota.create({
                data: {
                    Nombre: mascota.Nombre,
                    Color: mascota.Color,
                    Fecha_Nacimiento: mascota.FechaNacimiento,
                    Peso: mascota.Peso,
                    Raza: mascota.Raza,
                    Sexo: mascota.Sexo,
                    Status: true, 
                    AreaID: mascota.AreaID,
                    Especie: mascota.Especie
                }
            });
            
            await tx.cliente_mascota.create({
                data: {
                    Cliente: mascota.CliID,
                    Mascota: pet.PetID
                }
            });
            await tx.expediente.create({
                data: {
                    PetID: pet.PetID
                }
            });

            return pet;
        });
    }

    async lista(vetID: number): Promise<MascotaPayload[]> {
        return this.prisma.mascota.findMany({
            include: {
                expediente: true
            },
            where: { 
                Status: true,
                cliente_mascota: {
                    every: {
                        cliente: {
                            VetID: vetID
                        }
                    }
                }
            }
        });
    }

    async obtener(petID: number, vetID: number): Promise<MascotaPayload> {
        return this.prisma.mascota.findUnique({
            include: {
                expediente: true
            },
            where: {
                PetID: petID,
                cliente_mascota: {
                    every: {
                        cliente: {
                            VetID: vetID
                        }
                    }
                }
            }
        })
    }
}