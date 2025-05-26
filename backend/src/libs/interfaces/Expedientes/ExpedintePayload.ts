import { Prisma } from "#models/index"

export type ExpedientePayload = Prisma.expedienteGetPayload<{include: {
    cita: {
        include: { 
            cita_estudios: true,
            cita_tratamiento: true
        }
    }
}}>