import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";
import { IClienteRepo } from "#libs/interfaces/Clientes/IClienteRepo";
import { Singleton } from "#libs/utils/singleton";
import { cliente, Prisma } from "#models/index";

export class ClienteRepo implements IClienteRepo{
    private prisma = Singleton.prisma;

    async actualizar(cliente: ClienteDTO, cteID: number): Promise<cliente> {
        return this.prisma.cliente.update({
            data: cliente,
            where: {
                CteID: cteID,
                VetID: cliente.VetID,
                Status: true
            }
        });
    }

    async borrar(cteID: number, vetID: number): Promise<cliente> {
        return this.prisma.cliente.update({
            data: {
                Status: false
            },
            where: { 
                CteID: cteID,
                VetID: vetID,
                Status: true
            }
        });
    }

    async buscar(where: Prisma.clienteWhereInput): Promise<cliente[]> {
        return this.prisma.cliente.findMany({ where });
    }

    async crear(cliente: ClienteDTO): Promise<cliente> {
        return this.prisma.cliente.create({
            data: {
                Nombre: cliente.Nombre,
                Apellido_Mat: cliente.Apellido_Mat,
                Apellido_Pat: cliente.Apellido_Pat,
                CURP: cliente.CURP,
                Direccion: cliente.Direccion,
                Correo: cliente.Correo,
                Celular: cliente.Celular,
                Telefono: cliente.Telefono,
                Status: true,
                VetID: cliente.VetID
            }
        });
    }

    async lista(vetID: number): Promise<cliente[]> {
        return this.prisma.cliente.findMany({
            where: { 
                Status: true, 
                VetID: vetID 
            }
        });
    }

    async obtener(cteID: number, vetID: number): Promise<cliente> {
        return this.prisma.cliente.findUnique({
            where: {
                CteID: cteID,
                VetID: vetID
            }
        })
    }
}