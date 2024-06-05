import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Personas = DB['public']['Tables']['personas']['Row']
  type PersonasInsert = DB['public']['Tables']['personas']['Insert']
  type PersonasUpdate = DB['public']['Tables']['personas']['Update']
  type Expedientes = DB['public']['Tables']['expedientes']['Row']
  type Consultas = DB['public']['Tables']['consultas']['Row']
  type ConsultasInsert = DB['public']['Tables']['consultas']['Insert']
  type Diagnosticos = DB['public']['Tables']['diagnosticos']['Row']
  type InfoDiagnosticos =
    DB['public']['Functions']['get_diagnosticos_by_expediente_and_filter_pagination']['Returns']
  type PersonasXUsuarios = DB['public']['Tables']['personas_x_usuarios']['Row']
  type Citas = DB['public']['Tables']['citas']['Row']
  type CitasUpdate = DB['public']['Tables']['citas']['Update']
  type EstadoConsultas = DB['public']['Tables']['estado_consultas']['Row']
  type InfoConsultas =
    DB['public']['Functions']['get_consultas_by_estado_and_filter_pagination']['Returns']
  type DiagnosticoInsert = DB['public']['Tables']['diagnosticos']['Insert']
  type ConsultasUpdate = DB['public']['Tables']['consultas']['Update']
  type Especializaciones = DB['public']['Tables']['especializaciones']['Row']
  type DataTableUsers =
    DB['public']['Functions']['get_personas_by_rol_and_filter_pagination']['Returns']
  type Roles = DB['public']['Tables']['roles']['Row']
  type CitasInsert = DB['public']['Tables']['citas']['Insert']
  type CitasDelete = DB['public']['Tables']['citas']['Delete']
  type EspecializacionXPersonas =
    DB['public']['Tables']['especializacion_x_personas']['Row']

  type UserType =
    | (Personas & { usuario: PersonasXUsuarios } & {
      role: Array<{
        rol: string
        especialidad: string[]
      }>
    })
    | null

  type RolesPermissons = 'doctor' | 'paciente' | 'administrador' | 'enfermero'
  type EstadosConsultas = 'preclinica' | 'diagnostico' | 'completada'
  type PersonasAndUsuarios = Array<{
    id: string
    nombre: string
    apellido: string
    fecha_nacimiento: string
    dni: string
    direccion: string
    genero: string
    telefono: string
    correo: string
    id_expediente: string | null
    rol: string
    nombre_rol: string
    creado: string
    usuario?: PersonasXUsuarios
  }>

  interface Events {
    start: Date
    end: Date
    title: string
    allDay?: boolean
    id?: string
    info?: Citas & { paciente: Personas | null } & { doctor: Personas | null }
  }

  interface SendInfoDiagnostico {
    id_diagnostico: string
    fecha_diagnostico: string
    numero_expediente: string
    id_consulta: string
    enfermedades: string
    observacion: string
    interno: boolean
    diferencial: boolean
  }

  interface InfoMedico {
    id_especializacion: string
    id_persona: string
    personas: {
      nombre: string
      apellido: string
      idUsuario: Array<{
        correo: string
        avatar_url: string | null
      }>
      idJornada: {
        jornada: string
      } | null
    } | null
  }

  type InfoMedicoJornada = (Personas & { jornada: Jornadas | null }) | null

  interface consultaDiagnostico {
    id: string
    id_diagnosticador: {
      apellido: string
      correo: string | null
      creado: string
      direccion: string | null
      dni: string
      fecha_nacimiento: string
      genero: string
      id: string
      id_jornada: string | null
      nombre: string
      rol: string | null
      telefono: string | null
    } | null
    consultas: {
      estatura: number | null
      fecha_consulta: string
      id: string
      id_cita: string | null
      id_estado_consulta: string
      id_expediente: string
      peso: number | null
      presion_arterial: string | null
      saturacion_oxigeno: string | null
      sintomas: string | null
      temperatura: number | null
    } | null
  }

  interface InfoDoctor {
    id_especializacion: string
    id_persona: string
    personas: {
      nombre: string
      apellido: string
      idUsuario: Array<{
        correo: string
        avatar_url: string | null
      }>
      idJornada: {
        jornada: string
      } | null
    } | null
    especializaciones: {
      nombre: string
      idRoles: {
        nombre: string
      } | null
    } | null
  }
}
