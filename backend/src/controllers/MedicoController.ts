import { MedicoBuilder } from "#libs/builder/MedicoBuilder";
import { MedicoDTO } from "#libs/interfaces/Medicos/MedicoDTO";
import { MedicoService } from "#root/services/MedicoService";
import { Request, Response } from "express";

export class MedicoController {
    private service: MedicoService = new MedicoService();

    constructor(){
        this.ActualizarMedico = this.ActualizarMedico.bind(this);
        this.BorrarMedico = this.BorrarMedico.bind(this);
        this.BuscarMedico = this.BuscarMedico.bind(this);
        this.CrearMedico = this.CrearMedico.bind(this);
        this.ListaMedico = this.ListaMedico.bind(this);
        this.ObtenerMedico = this.ObtenerMedico.bind(this);
    }

    async ActualizarMedico(req: Request, res: Response){
        const cteID = Number(req.params.id);
        const medico = req.body as MedicoDTO;
        medico.VetID = req.session.VetID;

        try {
            const result = await this.service.ActualizarMedico(medico, cteID);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el medico',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BorrarMedico(req: Request, res: Response){
        const medID = Number(req.params.id);
        const { VetID } = req.session;

        try {
            const result = await this.service.BorrarMedico(medID, VetID);
            res.status(200).json({ message: 'Medico borrado exitosamente', result });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al borrar el medico',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarMedico(req: Request, res: Response){
        const search = req.body as MedicoDTO;
        search.VetID = req.session.VetID;

        try {
            const result = await this.service.BuscarMedico(search);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar medico',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async CrearMedico(req: Request, res: Response){
        const {
            Nombre,
            ApellidoPat,
            ApellidoMat,
            Direccion,
            Correo,
            Telefono,
            Celular,
            RFC,
            Status,
            RolID,
            VetID
        } = req.body;

        const medico = new MedicoBuilder()
            .setNombre(Nombre)
            .setApellidoPat(ApellidoPat)
            .setApellidoMat(ApellidoMat)
            .setDireccion(Direccion)
            .setCorreo(Correo)
            .setTelefono(Telefono)
            .setCelular(Celular)
            .setRFC(RFC)
            .setStatus(Status)
            .setRolID(RolID)
            .setVetID(VetID)
            .build();
        medico.VetID = req.session.VetID;

        try {
            await this.service.CrearMedico(medico);
            res.status(201).json({ message: 'Medico creado exitosamente' });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al crear medico',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaMedico(req: Request, res: Response){
        const { VetID } = req.session
        
        try {
            const list = await this.service.ListaMedico(VetID);
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de medicos',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerMedico(req: Request, res: Response){
        const medID = Number(req.params.id);
        const VetID = req.session.VetID;
        try {
            const medico = await this.service.ObtenerMedico(medID, VetID);
            if (!medico) {
                res.status(404).json({ message: 'Medico no encontrado' });
                return;
            }

            res.status(200).json(medico);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener medico',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}