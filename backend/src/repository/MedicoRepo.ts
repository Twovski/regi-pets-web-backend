import { IMedicoRepo } from "#libs/interfaces/Medicos/IMedicoRepo";
import { MedicoDTO } from "#libs/interfaces/Medicos/MedicoDTO";
import { AES_256 } from "#libs/utils/AES-256";
import { Singleton } from "#libs/utils/singleton";
import { medico, Prisma } from "#models/index";

export class MedicoRepo implements IMedicoRepo{
    private prisma = Singleton.prisma;

    async actualizar(medico: MedicoDTO, medID: number): Promise<medico> {
        return this.prisma.medico.update({
            data: medico,
            where: {
                MedID: medID,
                VetID: medico.VetID,
                Status: true
            }
        });
    }

    async borrar(medID: number, vetID: number): Promise<medico> {
        return this.prisma.medico.update({
            data: {
                Status: false
            },
            where: { 
                MedID: medID,
                VetID: vetID,
                Status: true
            }
        });
    }

    async buscar(where: Prisma.medicoWhereInput): Promise<medico[]> {
        return this.prisma.medico.findMany({ where });
    }

    async crear(medico: MedicoDTO): Promise<medico> {
        return this.prisma.$transaction(async (tx) => {
            const sesion = await tx.sesion.create({
                data: {
                    Correo: medico.Correo,
                    Clave: AES_256.encriptar(medico.RFC),
                }
            });

            const resultado = await tx.medico.create({
                include: {
                    sesion: true
                },
                data: {
                    Nombre: medico.Nombre,
                    Apellido_Mat: medico.ApellidoMat,
                    Apellido_Pat: medico.ApellidoPat,
                    RFC: medico.RFC,
                    Direccion: medico.Direccion,
                    Celular: medico.Celular,
                    Telefono: medico.Telefono,
                    Status: true,
                    veterinaria: {
                        connect: { VetID: medico.VetID }
                    },
                    rol: {
                        connect: { RolID: medico.RolID }
                    },
                    sesion: {
                        connect: { Correo: sesion.Correo }
                    }
                }
            });

            return resultado;
        });
    }

    async lista(vetID: number): Promise<medico[]> {
        return this.prisma.medico.findMany({
            where: { 
                Status: true, 
                VetID: vetID 
            }
        });
    }

    async obtener(medID: number, vetID: number): Promise<medico> {
        return this.prisma.medico.findUnique({
            where: {
                MedID: medID,
                VetID: vetID
            }
        })
    }
}