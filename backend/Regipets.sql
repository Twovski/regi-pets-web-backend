CREATE DATABASE RegiPets;
USE DATABASE RegiPets;

CREATE TABLE `Veterinaria`(
    `VetID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Domicilio` VARCHAR(255) NOT NULL,
    `Codigo Postal` CHAR(5) NOT NULL,
    `Contacto` VARCHAR(255) NOT NULL,
    `Status` BOOLEAN NOT NULL
);
CREATE TABLE `Cliente`(
    `CteID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Apellido Pat` VARCHAR(255) NOT NULL,
    `Apellido Mat` VARCHAR(255) NOT NULL,
    `CURP` VARCHAR(18) NOT NULL,
    `Direccion` VARCHAR(255) NOT NULL,
    `Correo` VARCHAR(320) NOT NULL,
    `Telefono` VARCHAR(255) NULL,
    `Celular` VARCHAR(255) NULL,
    `Status` BOOLEAN NOT NULL,
    `VetID` INT UNSIGNED NOT NULL
);

CREATE TABLE `Medico`(
    `MedID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Apellido Pat` VARCHAR(255) NOT NULL,
    `Apellido Mat` VARCHAR(255) NOT NULL,
    `Direccion` VARCHAR(255) NOT NULL,
    `Correo` VARCHAR(320) NOT NULL,
    `Telefono` VARCHAR(255) NULL,
    `Celular` VARCHAR(255) NULL,
    `RFC` VARCHAR(13) NOT NULL,
    `Status` BOOLEAN NOT NULL,
    `VetID` INT UNSIGNED NOT NULL,
    `RolID` INT UNSIGNED NOT NULL
);

CREATE TABLE `Sesion`(
	`Correo` VARCHAR(320) NOT NULL PRIMARY KEY,
	`Clave` VARCHAR(64) NOT NULL
);

CREATE TABLE `Mascota`(
    `PetID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Especie` INT UNSIGNED NOT NULL,
    `Raza` VARCHAR(255) NOT NULL,
    `Color` VARCHAR(255) NOT NULL,
    `Sexo` VARCHAR(255) NOT NULL,
    `Peso` DECIMAL(8, 2) NOT NULL,
    `Fecha Nacimiento` DATE NOT NULL,
    `Status` BOOLEAN NOT NULL,
    `AreaID` INT UNSIGNED NULL
);

CREATE TABLE `Cita`(
    `CitaID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Fecha` DATETIME NOT NULL,
    `Observaciones` TEXT NULL,
    `Medico` INT UNSIGNED NOT NULL,
    `Expediente` INT UNSIGNED NOT NULL,
    `Estado` ENUM('ASIGNADO', 'TERMINADO') NOT NULL
);

CREATE TABLE `Expediente`(
    `Folio` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `PetID` INT UNSIGNED NOT NULL,
    `FechaCitaProx` DATETIME NULL
);

CREATE TABLE `Rol`(
    `RolID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);

CREATE TABLE `Especie`(
    `EspID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);

CREATE TABLE `Area`(
    `AreaID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);
CREATE TABLE `Cliente_Mascota` (
    `Cliente` INT UNSIGNED NOT NULL,
    `Mascota` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`Cliente`, `Mascota`)
);
CREATE TABLE `Cita_Tratamiento`(
    `CitaID` INT UNSIGNED NOT NULL,
    `TxID` INT UNSIGNED NOT NULL,
    `Dosis` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`CitaID`, `TxID`)
);
CREATE TABLE `Cita_Estudios`(
    `CitaID` INT UNSIGNED NOT NULL,
    `EstID` INT UNSIGNED NOT NULL,
    `Resultados` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`CitaID`, `EstID`)
);
CREATE TABLE `Tratamiento`(
    `TxID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);
CREATE TABLE `Estudio`(
    `EstID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);

-- Cita → Expediente
ALTER TABLE `Cita`
ADD CONSTRAINT `cita_expediente_foreign` FOREIGN KEY (`Expediente`) REFERENCES `Expediente`(`Folio`)
ON DELETE CASCADE;

-- Cita → Medico
ALTER TABLE `Cita`
ADD CONSTRAINT `cita_medico_foreign` FOREIGN KEY (`Medico`) REFERENCES `Medico`(`MedID`)
ON DELETE CASCADE;

-- Cita_Estudios → Cita
ALTER TABLE `Cita_Estudios`
ADD CONSTRAINT `cita_estudios_citaid_foreign` FOREIGN KEY (`CitaID`) REFERENCES `Cita`(`CitaID`)
ON DELETE CASCADE;

-- Cita_Estudios → Estudio
ALTER TABLE `Cita_Estudios`
ADD CONSTRAINT `cita_estudios_estid_foreign` FOREIGN KEY (`EstID`) REFERENCES `Estudio`(`EstID`)
ON DELETE CASCADE;

-- Cita_Tratamiento → Cita
ALTER TABLE `Cita_Tratamiento`
ADD CONSTRAINT `cita_tratamiento_citaid_foreign` FOREIGN KEY (`CitaID`) REFERENCES `Cita`(`CitaID`)
ON DELETE CASCADE;

-- Cita_Tratamiento → Tratamiento
ALTER TABLE `Cita_Tratamiento`
ADD CONSTRAINT `cita_tratamiento_txid_foreign` FOREIGN KEY (`TxID`) REFERENCES `Tratamiento`(`TxID`)
ON DELETE CASCADE;

-- Cliente → Veterinaria
ALTER TABLE `Cliente`
ADD CONSTRAINT `cliente_vetid_foreign` FOREIGN KEY (`VetID`) REFERENCES `Veterinaria`(`VetID`)
ON DELETE CASCADE;

-- Cliente_Mascota → Cliente
ALTER TABLE `Cliente_Mascota`
ADD CONSTRAINT `cliente_mascota_cliente_foreign` FOREIGN KEY (`Cliente`) REFERENCES `Cliente`(`CteID`)
ON DELETE CASCADE;

-- Cliente_Mascota → Mascota
ALTER TABLE `Cliente_Mascota`
ADD CONSTRAINT `cliente_mascota_mascota_foreign` FOREIGN KEY (`Mascota`) REFERENCES `Mascota`(`PetID`)
ON DELETE CASCADE;

-- Expediente → Mascota
ALTER TABLE `Expediente`
ADD CONSTRAINT `expediente_petid_foreign` FOREIGN KEY (`PetID`) REFERENCES `Mascota`(`PetID`)
ON DELETE CASCADE;

-- Medico → Veterinaria
ALTER TABLE `Medico`
ADD CONSTRAINT `medico_vetid_foreign` FOREIGN KEY (`VetID`) REFERENCES `Veterinaria`(`VetID`)
ON DELETE CASCADE;

-- Medico → Rol
ALTER TABLE `Medico`
ADD CONSTRAINT `medico_rolid_foreign` FOREIGN KEY (`RolID`) REFERENCES `Rol`(`RolID`)
ON DELETE CASCADE;

-- Mascota → Especie
ALTER TABLE `Mascota`
ADD CONSTRAINT `mascota_especie_foreign` FOREIGN KEY (`Especie`) REFERENCES `Especie`(`EspID`)
ON DELETE CASCADE;

-- Mascota → Área
ALTER TABLE `Mascota`
ADD CONSTRAINT `mascota_areaid_foreign` FOREIGN KEY (`AreaID`) REFERENCES `Area`(`AreaID`)
ON DELETE CASCADE;

ALTER TABLE `Medico`
ADD CONSTRAINT `medico_correo_foreign` FOREIGN KEY (`Correo`)
REFERENCES `Sesion`(`Correo`) ON DELETE CASCADE;

ALTER TABLE `Medico`
ADD UNIQUE (`Correo`);

ALTER TABLE `Cliente`
ADD CONSTRAINT `UQ_CURP` UNIQUE (`CURP`),
ADD CONSTRAINT `UQ_Correo` UNIQUE (`Correo`);

INSERT INTO `Veterinaria` (`VetID`, `Nombre`, `Domicilio`, `Codigo Postal`, `Contacto`, `Status`) VALUES
(1, 'Veterinaria Central', 'Av. Siempre Viva 123, Col. Centro', '80010', '+526671234567', 1),
(2, 'Clinica Veterinaria Sur', 'Calle Luna 45, Col. Jardines', '80020', '+526677654321', 1),
(3, 'Pet Care Hospital', 'Blvd. Sol 789, Col. Residencial', '80030', '+526679876543', 1);

INSERT INTO Rol(RolID, Nombre)
VALUES 
(1, 'Recepcionista'),
(2, 'Veterinario'),
(3, 'Jefe');

INSERT INTO `Especie` (`EspID`, `Nombre`) VALUES
(1, 'Perro'),
(2, 'Gato'),
(3, 'Ave'),
(4, 'Roedor'),
(5, 'Reptil');

INSERT INTO `Area` (`AreaID`, `Nombre`) VALUES
(1, 'Consulta General'),
(2, 'Cirugia'),
(3, 'Hospitalizacion'),
(4, 'Laboratorio y Diagnostico'),
(5, 'Farmacia');

INSERT INTO `Cliente` (`CteID`, `Nombre`, `Apellido Pat`, `Apellido Mat`, `CURP`, `Direccion`, `Correo`, `Telefono`, `Celular`, `Status`, `VetID`) VALUES
(1, 'Juan', 'Perez', 'Gomez', 'PEPJ800101HDFRZN01', 'Calle Falsa 123, Col. Obrero', 'juan.perez@example.com', '+526671100000', '+526671112233', 1, 1),
(2, 'Maria', 'Rodriguez', 'Lopez', 'ROLM820202MDFLPR02', 'Av. Principal 456, Col. Cumbres', 'maria.r@example.com', '+526672223344', '+526672200000', 1, 1),
(3, 'Carlos', 'Garcia', 'Martinez', 'GAMC850303HDFRLR03', 'Blvd. Secundario 789, Col. Linda Vista', 'carlos.g@example.com', '+526673334455', '+526674445566', 1, 2),
(4, 'Ana', 'Lopez', 'Hernandez', 'LOHA870404MDFNRN04', 'Privada del Sol 101, Col. Estrellas', 'ana.l@example.com', '+526670000000', '+526670000111', 1, 2),
(5, 'Pedro', 'Sanchez', 'Gonzalez', 'SAGP900505HDFNZD05', 'Andador Uno 202, Col. Palmeras', 'pedro.s@example.com', '+526675556677', '+526676667788', 0, 3),
(6, 'Sofia', 'Martinez', 'Ruiz', 'MARS910606MDFLZC06', 'Circuito Dos 303, Col. Flores', 'sofia.m@example.com', '+526670000222', '+526670000333', 1, 3),
(7, 'Luis', 'Hernandez', 'Diaz', 'HELD920707HDFDZS07', 'Via Tres 404, Col. Arboledas', 'luis.h@example.com', '+526677778899', '+526670000444', 1, 1),
(8, 'Laura', 'Gonzalez', 'Torres', 'GOTL930808MDFTRR08', 'Camino Real 505, Col. Monte Alto', 'laura.g@example.com', '+526670000555', '+526678889900', 1, 2),
(9, 'Diego', 'Diaz', 'Cruz', 'DICD940909HDFCRZ09', 'Paseo de los Lagos 606, Col. Agua Clara', 'diego.d@example.com', '+526679990011', '+526670001122', 1, 3),
(10, 'Fernanda', 'Ruiz', 'Flores', 'RUFF951010MDFLRS10', 'Calle de las Rosas 707, Col. Jardines', 'fernanda.r@example.com', '+526670001233', '+526670001344', 1, 1);


INSERT INTO `Sesion` (`Correo`, `Clave`) VALUES
('roberto.s@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE='),
('andrea.m@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE='),
('jorge.c@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE='),
('patricia.o@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE='),
('eduardo.n@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE='),
('susana.r@example.com', 'U2FsdGVkX1+kTKgShZtAKPke01LUIiQUBJMbjpMjvaE=');

INSERT INTO `Medico` (`MedID`, `Nombre`, `Apellido Pat`, `Apellido Mat`, `Direccion`, `Correo`, `Telefono`, `Celular`, `RFC`, `Status`, `VetID`, `RolID`) VALUES
(1, 'Dr. Roberto', 'Silva', 'Vega', 'Calle del Medico 1, Col. Doctores', 'roberto.s@example.com', NULL, '+526671213141', 'SIVR800101ABC', 1, 1, 1),
(2, 'Dra. Andrea', 'Mendoza', 'Reyes', 'Av. Salud 2, Col. Hospitales', 'andrea.m@example.com', '+526672324252', NULL, 'MERA850202DEF', 1, 1, 1),
(3, 'Dr. Jorge', 'Castro', 'Vargas', 'Blvd. Bienestar 3, Col. Enfermeros', 'jorge.c@example.com', '+526673435363', '+526674546474', 'CAVJ900303GHI', 1, 2, 1),
(4, 'Dra. Patricia', 'Ortega', 'Lara', 'Privada Medica 4, Col. Quirurgicos', 'patricia.o@example.com', NULL, NULL, 'OALP920404JKL', 1, 2, 2),
(5, 'Dr. Eduardo', 'Navarro', 'Jimenez', 'Andador Sanitario 5, Col. Clinicos', 'eduardo.n@example.com', '+526675657585', '+526676768696', 'NAJE880505MNO', 1, 3, 1),
(6, 'Lic. Susana', 'Rojas', 'Perez', 'Circuito Asistencia 6, Col. Apoyos', 'susana.r@example.com', NULL, NULL, 'ROPS950606PQR', 1, 3, 3);

INSERT INTO `Mascota` (`PetID`, `Nombre`, `Especie`, `Raza`, `Color`, `Sexo`, `Peso`, `Fecha Nacimiento`, `Status`, `AreaID`) VALUES
(1, 'Fido', 1, 'Labrador', 'Dorado', 'Macho', 30.50, '2018-05-10', 1, NULL),
(2, 'Pelusa', 2, 'Siames', 'Crema', 'Hembra', 4.20, '2019-01-15', 1, NULL),
(3, 'Rocky', 1, 'Pastor Aleman', 'Negro y Fuego', 'Macho', 35.00, '2017-11-20', 1, NULL),
(4, 'Mishi', 2, 'Gato Comun', 'Atigrado', 'Hembra', 3.80, '2020-03-01', 1, NULL),
(5, 'Canela', 1, 'Chihuahua', 'Cafe Claro', 'Hembra', 5.50, '2021-07-05', 1, NULL),
(6, 'Kiwi', 3, 'Periquito', 'Verde', 'Indefinido', 0.10, '2022-08-12', 1, NULL),
(7, 'Bigotes', 4, 'Hamster', 'Cafe', 'Macho', 0.25, '2023-04-18', 1, NULL),
(8, 'Luna', 1, 'Golden Retriever', 'Dorado', 'Hembra', 28.00, '2019-06-25', 1, NULL),
(9, 'Coco', 2, 'Persa', 'Blanco', 'Macho', 5.00, '2020-09-01', 1, NULL),
(10, 'Max', 1, 'Boxer', 'Atigrado', 'Macho', 32.00, '2017-02-14', 1, NULL),
(11, 'Chloe', 2, 'Ragdoll', 'Crema y Gris', 'Hembra', 4.50, '2021-11-11', 1, NULL),
(12, 'Lucas', 1, 'Poodle', 'Blanco', 'Macho', 8.00, '2022-01-20', 1, NULL),
(13, 'Pipo', 3, 'Cacatua', 'Blanco', 'Indefinido', 0.50, '2023-05-01', 1, NULL),
(14, 'Rex', 1, 'Rottweiler', 'Negro y Fuego', 'Macho', 40.00, '2016-03-08', 1, NULL),
(15, 'Mia', 2, 'Maine Coon', 'Atigrado Gris', 'Hembra', 6.00, '2020-12-01', 1, NULL);

INSERT INTO `Cliente_Mascota` (`Cliente`, `Mascota`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9),
(7, 10),
(8, 11),
(9, 12),
(9, 13),
(10, 14),
(10, 15);

INSERT INTO `Tratamiento` (`TxID`, `Nombre`) VALUES
(1, 'Vacunacion Anual (Perro)'),
(2, 'Desparasitacion Interna'),
(3, 'Desparasitacion Externa'),
(4, 'Corte de Unas'),
(5, 'Limpieza de Oidos'),
(6, 'Vacunacion Anual (Gato)'),
(7, 'Cirugia Menor'),
(8, 'Antibiotico Oral'),
(9, 'Antiinflamatorio');

INSERT INTO `Estudio` (`EstID`, `Nombre`) VALUES
(1, 'Analisis de Sangre Completo'),
(2, 'Radiografia'),
(3, 'Analisis de Orina'),
(4, 'Coprologico'),
(5, 'Ultrasonido');

INSERT INTO `Expediente` (`Folio`, `PetID`, `FechaCitaProx`) VALUES
(1, 1, '2024-06-15 10:00:00'),
(2, 2, '2024-07-20 16:00:00'),
(3, 3, '2024-08-10 11:00:00'),
(4, 4, '2024-06-01 16:00:00'),
(5, 5, '2024-09-05 15:00:00'),
(6, 8, '2024-07-01 10:00:00'),
(7, 9, '2024-08-25 11:00:00'),
(8, 10, '2024-06-20 16:00:00'),
(9, 11, '2024-09-10 10:00:00'),
(10, 12, '2024-07-05 10:00:00'),
(11, 14, '2024-08-01 11:00:00'),
(12, 15, '2024-06-05 11:00:00');
INSERT INTO `Cita` (`CitaID`, `Fecha`, `Observaciones`, `Medico`, `Expediente`, `Estado`) VALUES
(1, '2024-05-10 10:00:00', 'Revision general y vacunacion anual.', 1, 1, 'ASIGNADO'),
(2, '2024-05-10 11:00:00', 'Consulta por estornudos.', 1, 2, 'ASIGNADO'),
(3, '2024-05-11 09:30:00', 'Consulta por cojera.', 3, 3, 'ASIGNADO'),
(4, '2024-05-11 10:30:00', 'Revision de rutina.', 1, 4, 'ASIGNADO'),
(5, '2024-05-12 14:00:00', 'Vacunacion y desparasitacion.', 5, 5, 'ASIGNADO'),
(6, '2024-05-13 15:30:00', 'Consulta dermatologica.', 2, 6, 'TERMINADO'),
(7, '2024-05-13 16:00:00', 'Revision post-operatoria.', 3, 7, 'TERMINADO'),
(8, '2024-05-14 10:00:00', 'Consulta de seguimiento.', 5, 8, 'ASIGNADO'),
(9, '2024-05-14 11:30:00', 'Revision de peso y dieta.', 1, 9, 'ASIGNADO'),
(10, '2024-05-15 12:00:00', 'Consulta general.', 2, 10, 'TERMINADO');

INSERT INTO `Cita_Tratamiento` (`CitaID`, `TxID`, `Dosis`) VALUES
(1, 1, '1 dosis inyectable'),
(2, 2, 'Tableta unica'),
(3, 8, '5 ml cada 8 horas por 7 dias'),
(4, 9, '1 tableta cada 12 horas por 5 dias'),
(5, 2, 'Pasta oral, segun peso'),
(6, 1, '1 dosis inyectable'),
(7, 3, 'Pipeta topica'),
(8, 8, '3 ml cada 12 horas por 10 dias'),
(9, 9, 'Media tableta diaria'),
(10, 4, 'Segun necesidad');

INSERT INTO `Cita_Estudios` (`CitaID`, `EstID`, `Resultados`) VALUES
(2, 1, 'Leucocitos ligeramente elevados, sugiere infeccion.'),
(3, 2, 'Fractura menor en radio izquierdo confirmada.'),
(6, 1, 'Recuperacion normal, parametros sanguineos estables.'),
(8, 5, 'Ultrasonido abdominal sin hallazgos relevantes.'),
(10, 4, 'Parasitos intestinales detectados, tratamiento recomendado.');