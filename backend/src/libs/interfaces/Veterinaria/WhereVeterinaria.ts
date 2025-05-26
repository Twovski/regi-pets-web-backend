export interface WhereVeterinaria {
  Nombre?: { startsWith: string };
  Domicilio?: { startsWith: string };
  CodigoPostal?: { startsWith: string };
  Contacto?: { startsWith: string };
  Status?: boolean | number;
}