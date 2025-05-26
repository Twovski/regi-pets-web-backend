export interface WhereMedico {
  Nombre?: { startsWith: string };
  ApellidoPat?: { startsWith: string };
  ApellidoMat?: { startsWith: string };
  Direccion?: { startsWith: string };
  Correo?: { startsWith: string };
  Telefono?: { startsWith: string };
  Celular?: { startsWith: string };
  RFC?: bigint | number; // Puedes usar bigint o number según cómo venga
  Status?: boolean | number;
  VetID?: number;
  RolID?: number;
}