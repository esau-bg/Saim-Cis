/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from '@/lib/supabase'
import { getIDEstadoConsultaByEstado } from '@/app/actions'

export async function getCitasByDoctor ({ id_doctor }: { id_doctor: string }) {
  const { data: citas, error: errorCitas } = await supabase
    .from('citas')
    .select('*, paciente:personas!citas_id_paciente_fkey(*)')
    .eq('id_doctor', id_doctor)
    .order('fecha_inicio', { ascending: true })

  return { citas, errorCitas }
}

export async function getCita ({ id_cita }: { id_cita: string }) {
  const { data: cita, error: errorCita } = await supabase
    .from('citas')
    .select('*, consulta:consultas(*)')
    .eq('id', id_cita)
    .single()

  // citasModifica ya que consulta es un objeto y no un array
  const citasModifica = {
    ...cita,
    consulta: cita?.consulta[0] ?? null
  }

  return { cita: citasModifica, errorCita }
}

export async function getConsultasById ({ id_consulta }: { id_consulta: string }) {
  const { data: consulta, error: errorConsulta } = await supabase
    .from('consultas')
    .select('*, estado:estado_consultas(*), expedientes(*, personas(*))')
    .eq('id', id_consulta)
    .single()

  return { consulta, errorConsulta }
}

// Crear un nuevo diagnostico
export async function createDiagnostico ({ data }: { data: DiagnosticoInsert }) {
  const { data: diagnostico, error: errorDiagnostico } = await supabase
    .from('diagnosticos')
    .insert({ ...data })
    .select('*')
    .single()
  return { diagnostico, errorDiagnostico }
}

// Actualizar una consulta
export async function updateConsulta ({ data }: { data: ConsultasUpdate }) {
  const { data: consultaUpdate, error: errorConsultaUpdate } = await supabase
    .from('consultas')
    .update({ ...data })
    .eq('id', data.id ?? '')
    .select('*')
    .single()

  return { consultaUpdate, errorConsultaUpdate }
}

export async function getEstadoConsultaAndChange ({ idConsulta, estado }: { idConsulta: string, estado: EstadosConsultas }) {
  const { dataIDEstado, errorIDEstado } = await getIDEstadoConsultaByEstado({ estado })

  if (errorIDEstado) {
    return { dataIDEstado, errorIDEstado }
  }

  if (!dataIDEstado) {
    return { dataIDEstado, errorIDEstado }
  }

  const { data: dataUpdate, error: errorUpdate } = await supabase
    .from('consultas')
    .update({ id_estado_consulta: dataIDEstado.id })
    .eq('id', idConsulta)
    .select('*, estado:estado_consultas(*)')
    .single()
  return { dataIDEstado: dataUpdate, errorIDEstado: errorUpdate }
}
