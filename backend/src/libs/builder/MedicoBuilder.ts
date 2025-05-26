import { MedicoDTO } from "#libs/interfaces/Medicos/MedicoDTO";

export class MedicoBuilder {
    private medico: Partial<MedicoDTO> = {};

    setNombre(nombre: string): this {
        this.medico.Nombre = nombre;
        return this;
    }

    setApellidoPat(apellidoPat: string): this {
        this.medico.ApellidoPat = apellidoPat;
        return this;
    }

    setApellidoMat(apellidoMat: string): this {
        this.medico.ApellidoMat = apellidoMat;
        return this;
    }

    setDireccion(direccion: string): this {
        this.medico.Direccion = direccion;
        return this;
    }

    setCorreo(correo: string): this {
        this.medico.Correo = correo;
        return this;
    }

    setTelefono(telefono: string | null): this {
        this.medico.Telefono = telefono;
        return this;
    }

    setCelular(celular: string | null): this {
        this.medico.Celular = celular;
        return this;
    }

    setRFC(rfc: string): this {
        this.medico.RFC = rfc.toUpperCase();
        return this;
    }

    setStatus(status: boolean): this {
        this.medico.Status = status;
        return this;
    }

    setRolID(rolId: number): this {
        this.medico.RolID = rolId;
        return this;
    }

    setVetID(vetId: number): this {
        this.medico.VetID = vetId;
        return this;
    }

    build(): MedicoDTO {
        return this.medico;
    }
}