import { VeterinariaDTO } from "#libs/interfaces/Veterinaria/VeterinariaDTO";

export class VeterinariaBuilder {
    private veterinaria: Partial<VeterinariaDTO> = {};

    setNombre(nombre: string): this {
        this.veterinaria.Nombre = nombre;
        return this;
    }

    setDomicilio(domicilio: string): this {
        this.veterinaria.Domicilio = domicilio;
        return this;
    }

    setCodigoPostal(codigoPostal: string): this {
        this.veterinaria.CodigoPostal = codigoPostal;
        return this;
    }

    setContacto(contacto: string): this {
        this.veterinaria.Contacto = contacto;
        return this;
    }

    setStatus(status: boolean): this {
        this.veterinaria.Status = status;
        return this;
    }

    build(): VeterinariaDTO {
        return this.veterinaria;
    }
}