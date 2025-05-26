import { RoleDTO } from "#libs/interfaces/Roles/RoleDTO";
import { RoleService } from "#root/services/RoleService";
import { Request, Response } from "express";

export class RoleController {
    private service: RoleService = new RoleService();

    constructor(){
        this.BuscarRole = this.BuscarRole.bind(this);
        this.ListaRole = this.ListaRole.bind(this);
    }

    async BuscarRole(req: Request, res: Response){
        const search = req.body as RoleDTO;

        try {
            const result = await this.service.BuscarRole(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar el role',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaRole(req: Request, res: Response){
        try {
            const list = await this.service.ListaRole();;
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de roles',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}