export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      citas: {
        Row: {
          descripcion: string | null
          estado: string
          fecha_final: string
          fecha_inicio: string
          fecha_registro: string
          id: string
          id_doctor: string
          id_paciente: string
        }
        Insert: {
          descripcion?: string | null
          estado: string
          fecha_final: string
          fecha_inicio: string
          fecha_registro?: string
          id?: string
          id_doctor: string
          id_paciente: string
        }
        Update: {
          descripcion?: string | null
          estado?: string
          fecha_final?: string
          fecha_inicio?: string
          fecha_registro?: string
          id?: string
          id_doctor?: string
          id_paciente?: string
        }
        Relationships: [
          {
            foreignKeyName: 'citas_id_doctor_fkey'
            columns: ['id_doctor']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'citas_id_paciente_fkey'
            columns: ['id_paciente']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      consultas: {
        Row: {
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
        }
        Insert: {
          estatura?: number | null
          fecha_consulta?: string
          id?: string
          id_cita?: string | null
          id_estado_consulta: string
          id_expediente: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas?: string | null
          temperatura?: number | null
        }
        Update: {
          estatura?: number | null
          fecha_consulta?: string
          id?: string
          id_cita?: string | null
          id_estado_consulta?: string
          id_expediente?: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas?: string | null
          temperatura?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'consultas_id_cita_fkey'
            columns: ['id_cita']
            isOneToOne: false
            referencedRelation: 'citas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'consultas_id_expediente_fkey'
            columns: ['id_expediente']
            isOneToOne: false
            referencedRelation: 'expedientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_consultas_id_estado_consulta_fkey'
            columns: ['id_estado_consulta']
            isOneToOne: false
            referencedRelation: 'estado_consultas'
            referencedColumns: ['id']
          }
        ]
      }
      diagnosticos: {
        Row: {
          diferencial: boolean
          enfermedades: string
          fecha_diagnostico: string
          id: string
          id_consulta: string | null
          id_diagnosticador: string | null
          id_expediente: string
          interno: boolean
          observacion: string | null
        }
        Insert: {
          diferencial: boolean
          enfermedades: string
          fecha_diagnostico?: string
          id?: string
          id_consulta?: string | null
          id_diagnosticador?: string | null
          id_expediente?: string
          interno: boolean
          observacion?: string | null
        }
        Update: {
          diferencial?: boolean
          enfermedades?: string
          fecha_diagnostico?: string
          id?: string
          id_consulta?: string | null
          id_diagnosticador?: string | null
          id_expediente?: string
          interno?: boolean
          observacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_diagnosticos_id_consulta_fkey'
            columns: ['id_consulta']
            isOneToOne: false
            referencedRelation: 'consultas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_diagnosticos_id_expediente_fkey'
            columns: ['id_expediente']
            isOneToOne: false
            referencedRelation: 'expedientes'
            referencedColumns: ['id']
          }
        ]
      }
      especializacion_x_personas: {
        Row: {
          id_especializacion: string
          id_persona: string
        }
        Insert: {
          id_especializacion: string
          id_persona: string
        }
        Update: {
          id_especializacion?: string
          id_persona?: string
        }
        Relationships: [
          {
            foreignKeyName: 'especializacion_x_personas_id_especializacion_fkey'
            columns: ['id_especializacion']
            isOneToOne: false
            referencedRelation: 'especializaciones'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_especializacion_x_personas_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      especializaciones: {
        Row: {
          id: string
          id_rol: string
          nombre: string
        }
        Insert: {
          id?: string
          id_rol: string
          nombre: string
        }
        Update: {
          id?: string
          id_rol?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: 'especializaciones_id_rol_fkey'
            columns: ['id_rol']
            isOneToOne: false
            referencedRelation: 'roles'
            referencedColumns: ['id']
          }
        ]
      }
      estado_consultas: {
        Row: {
          estado: string
          id: string
        }
        Insert: {
          estado: string
          id?: string
        }
        Update: {
          estado?: string
          id?: string
        }
        Relationships: []
      }
      expedientes: {
        Row: {
          fecha_apertura: string
          id: string
          id_persona: string
        }
        Insert: {
          fecha_apertura?: string
          id?: string
          id_persona: string
        }
        Update: {
          fecha_apertura?: string
          id?: string
          id_persona?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_expedientes_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      jornadas: {
        Row: {
          descripcion: string | null
          hora_final: string
          hora_inicio: string
          id: string
          jornada: string
        }
        Insert: {
          descripcion?: string | null
          hora_final: string
          hora_inicio: string
          id?: string
          jornada: string
        }
        Update: {
          descripcion?: string | null
          hora_final?: string
          hora_inicio?: string
          id?: string
          jornada?: string
        }
        Relationships: []
      }
      personas: {
        Row: {
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
        }
        Insert: {
          apellido: string
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni: string
          fecha_nacimiento: string
          genero: string
          id?: string
          id_jornada?: string | null
          nombre: string
          rol?: string | null
          telefono?: string | null
        }
        Update: {
          apellido?: string
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni?: string
          fecha_nacimiento?: string
          genero?: string
          id?: string
          id_jornada?: string | null
          nombre?: string
          rol?: string | null
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_personas_id_jornada_fkey'
            columns: ['id_jornada']
            isOneToOne: false
            referencedRelation: 'jornadas'
            referencedColumns: ['id']
          }
        ]
      }
      personas_x_usuarios: {
        Row: {
          avatar_url: string | null
          correo: string
          created_at: string
          descripcion: string | null
          estado: string | null
          id_persona: string
          id_usuario: string
          pass_temp: string | null
        }
        Insert: {
          avatar_url?: string | null
          correo: string
          created_at?: string
          descripcion?: string | null
          estado?: string | null
          id_persona: string
          id_usuario: string
          pass_temp?: string | null
        }
        Update: {
          avatar_url?: string | null
          correo?: string
          created_at?: string
          descripcion?: string | null
          estado?: string | null
          id_persona?: string
          id_usuario?: string
          pass_temp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'personas_x_usuarios_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'personas_x_usuarios_id_usuario_fkey'
            columns: ['id_usuario']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      roles: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id?: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_consultas_by_estado_and_filter_pagination: {
        Args: {
          estado_param: string
          filtro_param: string
          offset_param: number
          limit_param: number
        }
        Returns: Array<{
          id_consulta: string
          numero_expediente: string
          nombre: string
          apellido: string
          dni: string
          fecha_consulta: string
          estado_consulta: string
        }>
      }
      get_consultas_count_by_estado_and_filter: {
        Args: {
          estado_param: string
          filtro_param: string
        }
        Returns: number
      }
      get_diagnosticos_by_expediente_and_filter_pagination: {
        Args: {
          expediente_param: string
          filtro_param: string
          offset_param: number
          limit_param: number
        }
        Returns: Array<{
          id_diagnostico: string
          fecha_diagnostico: string
          numero_expediente: string
          id_consulta: string
          enfermedades: string
          observacion: string
          interno: boolean
          diferencial: boolean
        }>
      }
      get_diagnosticos_count_by_expediente_and_filter: {
        Args: {
          expediente_param: string
          filtro_param: string
        }
        Returns: number
      }
      get_personas_by_rol_and_filter_pagination: {
        Args: {
          rol_param: string
          filtro_param: string
          offset_param: number
          limit_param: number
        }
        Returns: Array<{
          id: string
          creado: string
          nombre: string
          apellido: string
          fecha_nacimiento: string
          dni: string
          direccion: string
          genero: string
          telefono: string
          correo: string
          rol: string
          nombre_rol: string
          url_avatar: string
          estado_usuario: string
        }>
      }
      get_personas_count_by_rol_and_filter: {
        Args: {
          rol_param: string
          filtro_param: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
