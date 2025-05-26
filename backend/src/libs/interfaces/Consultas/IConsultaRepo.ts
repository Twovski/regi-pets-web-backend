import { cita, Prisma } from "#models/index";
import { ConsultaDTO } from "./ConsultaDTO";
import { ConsultaPayload } from "./ConsultaPayload";

export interface IConsultaRepo {
    actualizar(update: Prisma.citaUpdateInput, citaID: number, vetID: number): Promise<cita>;
    buscar(cita: Prisma.citaWhereInput): Promise<ConsultaPayload[]>;
    lista(vetID: number): Promise<ConsultaPayload[]>;
    crear(consulta: ConsultaDTO): Promise<cita>;
    obtener(citaID: number, vetID: number): Promise<ConsultaPayload>;
}