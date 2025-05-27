import { EstadoConsulta } from "#libs/constants/EstadosConsultas";
import { ConsultaRepoLogger } from "#libs/decorator/ConsultaRepoLogger";
import { ConsultaActuaalizarDTO } from "#libs/interfaces/Consultas/ConsultaActualizarDTO";
import { ConsultaDTO } from "#libs/interfaces/Consultas/ConsultaDTO";
import { ConsultaEstudiosDTO } from "#libs/interfaces/Consultas/ConsultaEstudioSchema";
import { ConsultaMedicoDTO } from "#libs/interfaces/Consultas/ConsultaMedicoDTO";
import { ConsultaTratamientoDTO } from "#libs/interfaces/Consultas/ConsultaTratamientoSchema";
import { IConsultaRepo } from "#libs/interfaces/Consultas/IConsultaRepo";
import { EstudioDTO } from "#libs/interfaces/Estudios/EstudioDTO";
import { Prisma } from "#models/index";
import { ConsultaRepo } from "#root/repository/ConsultaRepo";
import { EstudioRepo } from "#root/repository/EstudioRepo";
import { ExpedienteRepo } from "#root/repository/ExpedienteRepo";
import { MedicoRepo } from "#root/repository/MedicoRepo";
import { TratamientoRepo } from "#root/repository/TratamientoRepo";

export class ConsultaService {
    private repository: IConsultaRepo;
    private expediente_repo: ExpedienteRepo;
    private medico_repo: MedicoRepo;
    private estudio_repo: EstudioRepo;
    private tratamiento_repo: TratamientoRepo;

    constructor() {
        this.repository = new ConsultaRepoLogger(new ConsultaRepo());
        this.expediente_repo = new ExpedienteRepo();
        this.medico_repo = new MedicoRepo();
        this.estudio_repo = new EstudioRepo();
        this.tratamiento_repo = new TratamientoRepo();
    }

    async ActualizarConsulta(consulta: ConsultaActuaalizarDTO, citaID: number, vetID: number){
        await this.ValidarExistencia(consulta, citaID, vetID);
        const update: Prisma.citaUpdateInput = {};
        update.Estado = EstadoConsulta.TERMINADO;
        
        if(consulta.Observaciones)
            update.Observaciones = consulta.Observaciones;

        if(consulta.Estudios?.length)
            update.cita_estudios = await this.ExistenciaEstudio(consulta.Estudios, citaID);

        if(consulta.Tratamientos?.length)
            update.cita_tratamiento = await this.ExistenciaTratamiento(consulta.Tratamientos, citaID);

        return this.repository.actualizar(update, citaID, vetID);  
    }

    async ActualizarMedicoConsulta(consulta: ConsultaMedicoDTO, citaID: number, vetID: number){
        await this.ValidarExistencia(consulta, citaID, vetID);

        const update: Prisma.citaUpdateInput = {};
        if(consulta.Medico)
            update.medico = {
                connect: { MedID: consulta.Medico }
            };

        return this.repository.actualizar(update, citaID, vetID);  
    }

    async BuscarConsulta(consulta: ConsultaDTO, vetID: number){
        const where: Prisma.citaWhereInput = {};
        where.Expediente = consulta.Expediente
        where.medico = { VetID : vetID };

        if(consulta.Fecha)
            where.Fecha = consulta.Fecha
        if(consulta.Medico)
            where.Medico = consulta.Medico
        if(consulta.Observaciones)
            where.Observaciones = { startsWith: consulta.Observaciones }
    
        return this.repository.buscar(where)
    }

    async CrearConsulta(consulta: ConsultaDTO, vetID: number){
        const [expediente, medico] = await Promise.all([
            this.expediente_repo.obtener(consulta.Expediente),
            this.medico_repo.obtener(consulta.Medico, vetID)
        ]);

        if(!expediente)
            throw new Error("Expediente no encontrado");
        if(!medico)
            throw new Error("Medico no encontrado");

        return this.repository.crear(consulta);
    }

    async ListaConsulta(vetID: number){
        return this.repository.lista(vetID);
    }

    async ListaConsultaPorExpediente(folio: number){
        return this.repository.buscar({
            Expediente: folio
        });
    }

    async ObtenerConsulta(folio: number, vetID: number){
        return this.repository.obtener(folio, vetID);
    }

    private async ValidarExistencia(consulta: ConsultaMedicoDTO, citaID: number, vetID: number){
        const [cita, expediente, medico] = await Promise.all([
            this.repository.obtener(citaID, vetID),
            this.expediente_repo.obtener(consulta.Expediente),
            this.medico_repo.obtener(consulta.Medico, vetID)
        ]);

        if(!cita)
            throw new Error('Consulta no encontrado');
        if(!expediente)
            throw new Error('Expediente no encontrado');
        if(!medico)
            throw new Error('Medico no encontrado');
    }

    private async ExistenciaEstudio(estudio: ConsultaEstudiosDTO[], citaID: number): Promise<Prisma.cita_estudiosUpdateManyWithoutCitaNestedInput>{
        const recibidos = estudio.map((value) => value.EstID);
        const resultado = await this.estudio_repo.buscar({
            EstID: {
                in: recibidos
            }
        });

        const existentes = resultado.map((value) => value.EstID);
        const faltantes = recibidos.filter((id) => !existentes.includes(id));
        if(faltantes.length > 0)
            throw new Error("Estudios no encontrado");
        
        return {
            connectOrCreate: estudio.map((value) => {
                return {
                    create: {
                        EstID: value.EstID,
                        Resultados: value.Resultados
                    },
                    where: {
                        CitaID_EstID: {
                            CitaID: citaID,
                            EstID: value.EstID
                        }
                    }
                }
            })
        }

    }

    private async ExistenciaTratamiento(tratamiento: ConsultaTratamientoDTO[], citaID: number): Promise<Prisma.cita_tratamientoUpdateManyWithoutCitaNestedInput>{
        const recibidos = tratamiento.map((value) => value.TxID);
        const resultado = await this.tratamiento_repo.buscar({
            TxID: {
                in: recibidos
            }
        });

        const existentes = resultado.map((value) => value.TxID);
        const faltantes = recibidos.filter((id) => !existentes.includes(id));
        if(faltantes.length > 0)
            throw new Error("Tratamientos no encontrado");
        
        return {
            connectOrCreate: tratamiento.map((value) => {
                return {
                    create: {
                        TxID: value.TxID,
                        Dosis: value.Dosis
                    },
                    where: {
                        CitaID_TxID: {
                            CitaID: citaID,
                            TxID: value.TxID
                        }
                    }
                }
            })
        }
            
    }
}