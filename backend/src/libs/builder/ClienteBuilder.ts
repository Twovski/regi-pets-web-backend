import { ClienteDTO } from "#libs/interfaces/Clientes/ClienteDTO";

export class ClienteBuilder {
    private cliente: Partial<ClienteDTO> = {};

    setNombre(nombre: string): this {
        this.cliente.Nombre = nombre;
        return this;
    }

    setApellidoPat(apellidoPat: string): this {
        this.cliente.Apellido_Pat = apellidoPat;
        return this;
    }

    setApellidoMat(apellidoMat: string): this {
        this.cliente.Apellido_Mat = apellidoMat;
        return this;
    }

    setDireccion(direccion: string): this {
        this.cliente.Direccion = direccion;
        return this;
    }

    setCorreo(correo: string): this {
        this.cliente.Correo = correo;
        return this;
    }

    setTelefono(telefono: string | null): this {
        this.cliente.Telefono = telefono;
        return this;
    }

    setCelular(celular: string | null): this {
        this.cliente.Celular = celular;
        return this;
    }

    setStatus(status: boolean): this {
        this.cliente.Status = status;
        return this;
    }

    setVetID(vetId: number): this {
        this.cliente.VetID = vetId;
        return this;
    }

    build(): ClienteDTO {
        return this.cliente;
    }
}