
import { ExpedienteDTO } from "#libs/interfaces/Expedientes/ExpedienteDTO";
import { ExpedienteService } from "#root/services/ExpedienteService";
import { Request, Response } from "express";

export class ExpedienteController {
    private service: ExpedienteService = new ExpedienteService();

    constructor(){
        this.ActualizarExpediente = this.ActualizarExpediente.bind(this);
        this.BuscarExpediente = this.BuscarExpediente.bind(this);
        this.ObtenerExpediente = this.ObtenerExpediente.bind(this);
    }

    async ActualizarExpediente(req: Request, res: Response){
        const folio = Number(req.params.id);
        const medico = req.body as ExpedienteDTO;

        try {
            const result = await this.service.ActualizarExpediente(medico, folio);
            res.status(200).json(result);
        }
        catch(error) {
            res.status(500).json({
                message: 'Error al actualizar el expediente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarExpediente(req: Request, res: Response){
        const search = req.body as ExpedienteDTO;

        try {
            const result = await this.service.BuscarExpediente(search);
            res.status(200).json(result);
        }
        catch(error) {
            res.status(500).json({
                message: 'Error al buscar el expediente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerExpediente(req: Request, res: Response){
        const folio = Number(req.params.id);

        try {
            const expediente = await this.service.ObtenerExpediente(folio);
            if (!expediente) {
                res.status(404).json({ message: 'Expediente no encontrado' });
                return;
            }

            res.status(200).json(expediente);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener el expediente',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}