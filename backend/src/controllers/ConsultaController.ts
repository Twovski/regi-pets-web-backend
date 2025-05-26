import { ConsultaActuaalizarDTO } from "#libs/interfaces/Consultas/ConsultaActualizarDTO";
import { ConsultaDTO } from "#libs/interfaces/Consultas/ConsultaDTO";
import { ConsultaMedicoDTO } from "#libs/interfaces/Consultas/ConsultaMedicoDTO";
import { ConsultaService } from "#root/services/ConsultaService";
import { Request, Response } from "express";

export class ConsultaController {
    private service: ConsultaService = new ConsultaService();

    constructor(){
        this.ActualizarConsulta = this.ActualizarConsulta.bind(this);
        this.BuscarConsulta = this.BuscarConsulta.bind(this);
        this.CrearConsulta = this.CrearConsulta.bind(this);
        this.ListaConsulta = this.ListaConsulta.bind(this);
        this.ObtenerConsulta = this.ObtenerConsulta.bind(this);
    }

    async ActualizarConsulta(req: Request, res: Response){
        const CitaID = Number(req.params.id);
        const consulta = req.body as ConsultaActuaalizarDTO;
        const { VetID } = req.session;

        try {
            const result = await this.service.ActualizarConsulta(consulta, CitaID, VetID);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la consulta',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ActualizarMedicoConsulta(req: Request, res: Response){
        const CitaID = Number(req.params.id);
        const consulta = req.body as ConsultaMedicoDTO;
        const { VetID } = req.session;

        try {
            const result = await this.service.ActualizarMedicoConsulta(consulta, CitaID, VetID);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la consulta',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarConsulta(req: Request, res: Response){
        const search = req.body as ConsultaDTO;
        const { VetID } = req.session;
        
        try {
            const result = await this.service.BuscarConsulta(search, VetID);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar la consulta',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async CrearConsulta(req: Request, res: Response){
        const consulta = req.body as ConsultaDTO
        const vetID = req.session.VetID;

        try{
            await this.service.CrearConsulta(consulta, vetID);
            res.status(200).json({ message: 'Consulta creado exitosamente' });
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al crear la consulta',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaConsulta(req: Request, res: Response){
        const { VetID } = req.session;

        try {
            const list = await this.service.ListaConsulta(VetID);
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de consultas',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerConsulta(req: Request, res: Response){
        const citaID = Number(req.params.id);
        const { VetID } = req.session;
        try {
            const consulta = await this.service.ObtenerConsulta(citaID, VetID);
            if (!consulta) {
                res.status(404).json({ message: 'Consulta no encontrado' });
                return;
            }

            res.status(200).json(consulta);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener consulta',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}