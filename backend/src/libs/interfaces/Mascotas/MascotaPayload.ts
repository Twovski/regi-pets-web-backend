import { Prisma } from "#models/index";

export type MascotaPayload = Prisma.mascotaGetPayload<{
    include: {
        expediente: true
    }
}>