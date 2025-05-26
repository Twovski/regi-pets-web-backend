export interface WhereClient {
  Nombre?: { startsWith: string };
  Apellido_Pat?: { startsWith: string };
  Apellido_Mat?: { startsWith: string };
  Direccion?: { startsWith: string };
  Correo?: { startsWith: string };
  Telefono?: { startsWith: string };
  Celular?: { startsWith: string };
  Status?: boolean | number; // Igual que search.Status
  VetID?: number;
}