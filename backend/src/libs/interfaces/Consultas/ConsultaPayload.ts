import { Prisma } from "#models/index";

export type ConsultaPayload = Prisma.citaGetPayload<{
    include: {
        cita_estudios: { 
            include: { estudio: true },
        },
        cita_tratamiento: { 
            include: { tratamiento: true },
        }
    }
}>