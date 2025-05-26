import { ExpedienteDTO } from "#libs/interfaces/Expedientes/ExpedienteDTO";
import { ExpedientePayload } from "#libs/interfaces/Expedientes/ExpedintePayload";
import { IExpedienteRepo } from "#libs/interfaces/Expedientes/IExpedienteRepo";
import { Singleton } from "#libs/utils/singleton";
import { Prisma, expediente } from "#models/index";

export class ExpedienteRepo implements IExpedienteRepo {
    private prisma = Singleton.prisma;

    async actualizar(exp: ExpedienteDTO, folio: number): Promise<expediente> {
        return this.prisma.expediente.update({
            data: {
                FechaCitaProx: exp.FechaCitaProx
            },
            where: {
                Folio: folio
            }
        });
    }

    async buscar(where: Prisma.expedienteWhereInput): Promise<ExpedientePayload[]> {
        return this.prisma.expediente.findMany({ 
            where,
            include: {
                cita: {
                    include: { 
                        cita_estudios: true,
                        cita_tratamiento: true
                    }
                }
            } 
        });
    }

    async obtener(folio: number): Promise<ExpedientePayload> {
        return this.prisma.expediente.findUnique({ 
            where: {
                Folio: folio
            },
            include: {
                cita: {
                    include: { 
                        cita_estudios: true,
                        cita_tratamiento: true
                    }
                }
            } 
        });
    }
    
}