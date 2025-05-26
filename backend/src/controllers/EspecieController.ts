import { EspecieDTO } from "#libs/interfaces/Especies/EspecieDTO";
import { EspecieService } from "#root/services/EspecieService";
import { Request, Response } from "express";

export class EspecieController {
    private service: EspecieService = new EspecieService();

    constructor(){
        this.BuscarEspecie = this.BuscarEspecie.bind(this);
        this.ListaEspecie = this.ListaEspecie.bind(this);
    }

    async BuscarEspecie(req: Request, res: Response){
        const search = req.body as EspecieDTO;
        try {
            const result = await this.service.BuscarEspecie(search);
            res.status(200).json(result);
        }
        catch(error) {
            res.status(500).json({
                message: 'Error al buscar la especie',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaEspecie(req: Request, res: Response){
        try {
            const list = await this.service.ListaEspecie();
            res.status(200).json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al obtener la lista de especies',
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }

}