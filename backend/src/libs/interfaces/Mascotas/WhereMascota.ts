export interface WhereMascota {
  Nombre?: { startsWith: string };
  Especie?: number;
  Raza?: { startsWith: string };
  Color?: { startsWith: string };
  Sexo?: { startsWith: string };
  Peso?: number;
  FechaNacimiento?: Date | string;
  Status?: boolean | number;
  AreaID?: number;
}