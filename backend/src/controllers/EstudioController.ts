import { EstudioDTO } from "#libs/interfaces/Estudios/EstudioDTO";
import { EstudioService } from "#root/services/EstudioService";
import { Request, Response } from "express";

export class EstudioController {
    private service: EstudioService = new EstudioService();

    constructor(){
        this.BuscarEstudio = this.BuscarEstudio.bind(this);
        this.ListaEstudio = this.ListaEstudio.bind(this);
    }

    async BuscarEstudio(req: Request, res: Response){
        const search = req.body as EstudioDTO;
        try {
            const result = await this.service.BuscarEstudio(search);
            res.status(200).json(result);
        }
        catch(error) {
            res.status(500).json({
                message: 'Error al buscar la estudio',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaEstudio(req: Request, res: Response){
        try {
            const list = await this.service.ListaEstudio();
            res.status(200).json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al obtener la lista de estudios',
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }

}