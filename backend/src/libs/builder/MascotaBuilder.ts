import { MascotaDTO } from "#libs/interfaces/Mascotas/MascotaDTO";

export class MascotaBuilder {
    private mascota: Partial<MascotaDTO> = {};

    setNombre(nombre: string): this {
        this.mascota.Nombre = nombre;
        return this;
    }

    setEspecie(especie: number): this {
        this.mascota.Especie = especie;
        return this;
    }

    setRaza(raza: string): this {
        this.mascota.Raza = raza;
        return this;
    }

    setColor(color: string): this {
        this.mascota.Color = color;
        return this;
    }

    setSexo(sexo: string): this {
        this.mascota.Sexo = sexo;
        return this;
    }

    setPeso(peso: number): this {
        this.mascota.Peso = peso;
        return this;
    }

    setFechaNacimiento(fecha: Date | string): this {
        this.mascota.FechaNacimiento = new Date(fecha);
        return this;
    }

    setStatus(status: boolean): this {
        this.mascota.Status = status;
        return this;
    }

    setAreaID(areaId: number | null): this {
        this.mascota.AreaID = areaId;
        return this;
    }

    setCliID(cliId: number): this {
        this.mascota.CliID = cliId;
        return this;
    }

    build(): MascotaDTO {
        return this.mascota;
    }
}