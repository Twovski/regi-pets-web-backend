import { IConsultaRepo } from "#libs/interfaces/Consultas/IConsultaRepo";
import { ConsultaDTO } from "#libs/interfaces/Consultas/ConsultaDTO";
import { Singleton } from "#libs/utils/singleton";
import { cita, Prisma } from "#models/index";
import { ConsultaPayload } from "#libs/interfaces/Consultas/ConsultaPayload";
import { EstadoConsulta } from "#libs/constants/EstadosConsultas";

export class ConsultaRepo implements IConsultaRepo{
    private prisma = Singleton.prisma;

    async actualizar(update: Prisma.citaUpdateInput, citaID: number, vetID: number): Promise<cita> {
        return this.prisma.$transaction(async (tx) => {
            const consulta = await tx.cita.update({
                data: update,
                where: {
                    CitaID: citaID,
                    medico: {
                        VetID: vetID
                    }
                }
            });

            return consulta;
        })
    }

    async buscar(where: Prisma.citaWhereInput): Promise<ConsultaPayload[]> {
        return this.prisma.cita.findMany({ 
            where,
            include: {
                cita_estudios: { 
                    include: { estudio: true },
                },
                cita_tratamiento: { 
                    include: { tratamiento: true },
                }
            }
         });
    }

    async crear(cita: ConsultaDTO): Promise<cita> {
        return this.prisma.$transaction(async (tx) => {
            const consulta = await tx.cita.create({
                data: {
                    Fecha: cita.Fecha,
                    Observaciones: cita.Observaciones,
                    Estado: EstadoConsulta.ASIGNADO,
                    medico: {
                        connect: { MedID: cita.Medico }
                    },
                    expediente: {
                        connect: { Folio: cita.Expediente }
                    }
                }
            });

            return consulta;
        })
    }

    async lista(vetID: number): Promise<ConsultaPayload[]> {
        return this.prisma.cita.findMany({
            include: {
                cita_estudios: { 
                    include: { estudio: true },
                },
                cita_tratamiento: { 
                    include: { tratamiento: true },
                }
            },
            where: {
                medico: {
                    VetID: vetID
                }
            }
        });
    }

    async obtener(citaID: number, vetID: number): Promise<ConsultaPayload> {
        return this.prisma.cita.findUnique({
            include: {
                cita_estudios: { 
                    include: { estudio: true },
                },
                cita_tratamiento: { 
                    include: { tratamiento: true },
                }
            },
            where: {
                CitaID: citaID,
                medico: {
                    VetID: vetID
                }
            }
        })
    }

}