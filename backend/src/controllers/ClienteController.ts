import { ClienteBuilder } from "#libs/builder/ClienteBuilder";
import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";
import { ClienteService } from "#root/services/ClienteService";
import { Request, Response } from "express";

export class ClienteController {
    private service: ClienteService = new ClienteService();

    constructor(){
        this.ActualizarCliente = this.ActualizarCliente.bind(this);
        this.BorrarCliente = this.BorrarCliente.bind(this);
        this.BuscarCliente = this.BuscarCliente.bind(this);
        this.CrearCliente = this.CrearCliente.bind(this);
        this.ListaCliente = this.ListaCliente.bind(this);
        this.ObtenerCliente = this.ObtenerCliente.bind(this);
    }

    async ActualizarCliente(req: Request, res: Response){
        const cteID = Number(req.params.id);
        const cliente = req.body as ClienteDTO;
        cliente.VetID = req.session.VetID;

        try {
            const result = await this.service.ActualizarCliente(cliente, cteID);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el cliente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BorrarCliente(req: Request, res: Response){
        const cteID = Number(req.params.id);
        const { VetID } = req.session;

        try {
            const result = await this.service.BorrarCliente(cteID, VetID);
            res.status(200).json({ message: 'Cliente borrado exitosamente', result });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al borrar el cliente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarCliente(req: Request, res: Response){
        const search = req.body as ClienteDTO;
        search.VetID = req.session.VetID;

        try {
            const result = await this.service.BuscarCliente(search);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar cliente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async CrearCliente(req: Request, res: Response){
        const {
            Nombre,
            Apellido_Pat,
            Apellido_Mat,
            Direccion,
            Correo,
            Telefono,
            Celular,
            Status,
            VetID
        } = req.body;

        const cliente = new ClienteBuilder()
            .setNombre(Nombre)
            .setApellidoPat(Apellido_Pat)
            .setApellidoMat(Apellido_Mat)
            .setDireccion(Direccion)
            .setCorreo(Correo)
            .setTelefono(Telefono)
            .setCelular(Celular)
            .setStatus(Status)
            .setVetID(VetID)
            .build();

        cliente.VetID = req.session.VetID;

        try {
            await this.service.CrearCliente(cliente);
            res.status(201).json({ message: 'Cliente creado exitosamente' });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al crear cliente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaCliente(req: Request, res: Response){
        const { VetID } = req.session;

        try {
            const list = await this.service.ListaCliente(VetID);
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de clientes',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerCliente(req: Request, res: Response){
        const cliID = Number(req.params.id);
        const VetID = req.session.VetID;
        try {
            const cliente = await this.service.ObtenerCliente(cliID, VetID);
            if (!cliente) {
                res.status(404).json({ message: 'Cliente no encontrado' });
                return;
            }

            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener cliente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}