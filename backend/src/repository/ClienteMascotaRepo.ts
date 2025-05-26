import { ClienteMascotaDTO } from "#libs/interfaces/Cliente Mascota/ClienteMascotaDTO";
import { IClienteMascotaRepo } from "#libs/interfaces/Cliente Mascota/IClienteMascota";
import { Singleton } from "#libs/utils/singleton";
import { cliente_mascota, Prisma } from "#models/index";

export class ClienteMascotaRepo implements IClienteMascotaRepo {
    private prisma = Singleton.prisma;

    async actualizar(cliente_mascota: ClienteMascotaDTO, where: ClienteMascotaDTO): Promise<cliente_mascota> {
        return this.prisma.cliente_mascota.update({
            data: cliente_mascota,
            where: {
                Cliente_Mascota: {
                    Cliente: where.Cliente,
                    Mascota: where.Mascota
                }
            }
        });
    }
    
    async borrar(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota> {
        return this.prisma.cliente_mascota.delete({
            where: { 
                Cliente_Mascota: {
                    Cliente: cliente_mascota.Cliente,
                    Mascota: cliente_mascota.Mascota
                }
            }
        });
    }

    async buscar(cliente_mascota: Prisma.cliente_mascotaWhereInput): Promise<cliente_mascota[]> {
        return this.prisma.cliente_mascota.findMany({ where: cliente_mascota });
    }

    async crear(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota> {
        return this.prisma.cliente_mascota.create({
            data: {
                Cliente: cliente_mascota.Cliente,
                Mascota: cliente_mascota.Mascota
            }
        });
    }

    async obtener(cliente_mascota: ClienteMascotaDTO): Promise<cliente_mascota> {
        return this.prisma.cliente_mascota.findUnique({
            where: {
                Cliente_Mascota: {
                    Cliente: cliente_mascota.Cliente,
                    Mascota: cliente_mascota.Mascota
                }
            }
        });
    }

}