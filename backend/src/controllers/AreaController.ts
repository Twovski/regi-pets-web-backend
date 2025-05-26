import { AreaDTO } from "#libs/interfaces/Area/AreaDTO";
import { AreaService } from "#root/services/AreaService";
import { Request, Response } from "express";

export class AreaController {
    private service: AreaService = new AreaService();

    constructor(){
        this.BuscarArea = this.BuscarArea.bind(this);
        this.ListaArea = this.ListaArea.bind(this);
    }

    async BuscarArea(req: Request, res: Response){
        const search = req.body as AreaDTO;
        try {
            const result = await this.service.BuscarArea(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar el area',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaArea(req: Request, res: Response){
        try {
            const list = await this.service.ListaArea();;
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de areas',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}