import { VeterinariaBuilder } from "#libs/builder/VeterinariaBuilder";
import { VeterinariaDTO } from "#libs/interfaces/Veterinaria/VeterinariaDTO";
import { VeterinariaService } from "#root/services/VeterinariaService";
import { Request, Response } from "express";

export class VeterinariaController {
    private service: VeterinariaService = new VeterinariaService();

    constructor(){
        this.ActualizarVeterinaria = this.ActualizarVeterinaria.bind(this);
        this.BorrarVeterinaria = this.BorrarVeterinaria.bind(this);
        this.BuscarVeterinaria = this.BuscarVeterinaria.bind(this);
        this.CrearVeterinaria = this.CrearVeterinaria.bind(this);
        this.ListaVeterinaria = this.ListaVeterinaria.bind(this);
        this.ObtenerMascota = this.ObtenerMascota.bind(this);
    }

    async ActualizarVeterinaria(req: Request, res: Response){
        const vetID = Number(req.params.id);
        const veterinaria = req.body as VeterinariaDTO;
    
        try {
            const result = await this.service.ActualizarVeterinaria(veterinaria, vetID);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el veterinaria',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BorrarVeterinaria(req: Request, res: Response){
        const vetID = Number(req.params.id);

        try {
            const result = await this.service.BorrarVeterinaria(vetID);
            res.status(200).json({ message: 'Veterinaria borrado exitosamente', result });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al borrar la veterinaria',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarVeterinaria(req: Request, res: Response){
        const search = req.body as VeterinariaDTO;
        
        try {
            const result = await this.service.BuscarVeterinaria(search);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar veterinaria',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async CrearVeterinaria(req: Request, res: Response){
        const {
            Nombre,
            Domicilio,
            CodigoPostal,
            Contacto,
            Status
        } = req.body;

        const veterinaria = new VeterinariaBuilder()
            .setNombre(Nombre)
            .setDomicilio(Domicilio)
            .setCodigoPostal(CodigoPostal)
            .setContacto(Contacto)
            .setStatus(Status)
            .build();
            
        try {
            await this.service.CrearVeterinaria(veterinaria);
            res.status(201).json({ message: 'Veterinaria creada exitosamente' });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al crear veterinaria',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaVeterinaria(req: Request, res: Response){
        try {
            const list = await this.service.ListaVeterinaria();
            res.status(200).json(list);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de veterinarias',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerMascota(req: Request, res: Response){
        const vetID = Number(req.params.id);

        try {
            const veterinaria = await this.service.ObtenerVeterinaria(vetID);
            if (!veterinaria) {
                res.status(404).json({ message: 'Veterinaria no encontrado' });
                return;
            }

            res.status(200).json(veterinaria);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener veterinaria',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}