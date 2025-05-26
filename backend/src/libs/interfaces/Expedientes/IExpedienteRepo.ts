import { Prisma, expediente } from "#models/client";
import { ExpedienteDTO } from "./ExpedienteDTO";
import { ExpedientePayload } from "./ExpedintePayload";

export interface IExpedienteRepo {
    actualizar(exp: ExpedienteDTO, folio: number): Promise<expediente>;
    buscar(where: Prisma.expedienteWhereInput): Promise<ExpedientePayload[]>;
    obtener(folio: number): Promise<ExpedientePayload>;
}
