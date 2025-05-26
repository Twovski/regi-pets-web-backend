import { TratamientoDTO } from "#libs/interfaces/Tratamientos/TratamientoDTO";
import { TratamientoService } from "#root/services/TratamientoService";
import { Request, Response } from "express";

export class TratamientoController {
    private service: TratamientoService = new TratamientoService();

    constructor(){
        this.BuscarTratamiento = this.BuscarTratamiento.bind(this);
        this.ListaTratamiento = this.ListaTratamiento.bind(this);
    }

    async BuscarTratamiento(req: Request, res: Response){
        const search = req.body as TratamientoDTO;

        try {
            const result = await this.service.BuscarTratamiento(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar el tratamientos',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaTratamiento(req: Request, res: Response){
        try {
            const list = await this.service.ListaTratamiento();;
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de tratamientos',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}