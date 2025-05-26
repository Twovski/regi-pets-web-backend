import { MascotaBuilder } from "#libs/builder/MascotaBuilder";
import { MascotaDTO } from "#libs/interfaces/Mascotas/MascotaDTO";
import { SerializedJSON } from "#libs/utils/JSONSerialized";
import { MascotaService } from "#root/services/MascotaService";
import { Request, Response } from "express";

export class MascotaController {
    private service: MascotaService = new MascotaService();

    constructor(){
        this.ActualizarMascota = this.ActualizarMascota.bind(this);
        this.BorrarMascota = this.BorrarMascota.bind(this);
        this.BuscarMascota = this.BuscarMascota.bind(this);
        this.CrearMascota = this.CrearMascota.bind(this);
        this.ListaMascota = this.ListaMascota.bind(this);
        this.ObtenerMascota = this.ObtenerMascota.bind(this);
    }

    async ActualizarMascota(req: Request, res: Response){
        const petID = Number(req.params.id);
        const mascota = req.body as MascotaDTO;
        const { VetID } = req.session;

        try {
            const result = await this.service.ActualizarMascota(mascota, petID, VetID);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la mascota',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BorrarMascota(req: Request, res: Response){
        const petID = Number(req.params.id);
        const { VetID } = req.session;

        try {
            const result = await this.service.BorrarMascota(petID, VetID);
            res.status(200).json({ message: 'Cliente borrado exitosamente', result });
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error al borrar la mascota',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async BuscarMascota(req: Request, res: Response){
        const search = req.body as MascotaDTO;
        const { VetID } = req.session;

        try {
            const result = await this.service.BuscarMascota(search, VetID);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al buscar mascota',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async CrearMascota(req: Request, res: Response){
        const {
            Nombre,
            Especie,
            Raza,
            Color,
            Sexo,
            Peso,
            FechaNacimiento,
            Status,
            AreaID,
            CliID
        } = req.body;

        const mascota = new MascotaBuilder()
            .setNombre(Nombre)
            .setEspecie(Especie)
            .setRaza(Raza)
            .setColor(Color)
            .setSexo(Sexo)
            .setPeso(Peso)
            .setFechaNacimiento(FechaNacimiento)
            .setStatus(Status)
            .setAreaID(AreaID)
            .setCliID(CliID)
            .build();
        const vetID = req.session.VetID;

        try{
            await this.service.CrearMascota(mascota, vetID);
            res.status(201).json({ message: 'Mascota creado exitosamente' });
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al crear mascota',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ListaMascota(req: Request, res: Response){
        const { VetID } = req.session;

        try{
            const list = await this.service.ListaMascota(VetID);
            res.status(200).json(list); 
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de mascotas',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async ObtenerMascota(req: Request, res: Response){
        const petID = Number(req.params.id);
        const { VetID } = req.session;

        try{
            const mascota = await this.service.ObtenerMascota(petID, VetID);
            if (!mascota) {
                res.status(404).json({ message: 'Mascota no encontrado' });
                return;
            }

            res.status(200).json(mascota);
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al obtener mascota',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}