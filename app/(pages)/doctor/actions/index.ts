/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from '@/lib/supabase'
import { getIDEstadoConsultaByEstado } from '@/app/actions'

export async function getCitasByDoctor ({ id_doctor }: { id_doctor: string }) {
  const { data: citas, error: errorCitas } = await supabase
    .from('citas')
    .select('*, doctor:personas!citas_id_doctor_fkey(*), paciente:personas!citas_id_paciente_fkey(*)')
    .eq('id_doctor', id_doctor)
    .in('estado', ['completada', 'pendiente'])
    .order('fecha_inicio', { ascending: true })

  return { citas, errorCitas }
}

export async function getInfoDoctor ({ id_doctor }: { id_doctor: string }) {
  const { data: InfoMedico, error: errorMedico } = await supabase
    .from('personas')
    .select('*, jornada:jornadas(*)')
    .eq('id', id_doctor)
    .single()

  return { InfoMedico, errorMedico }
}

export async function getCitasByPaciente ({ id_paciente }: { id_paciente: string }) {
  const { data: citasPaciente, error: errorCitasPaciente } = await supabase
    .from('citas')
    .select('*, paciente:personas!citas_id_paciente_fkey(*), doctor:personas!citas_id_doctor_fkey(*) ')
    .eq('id_paciente', id_paciente)
    .in('estado', ['completada', 'pendiente'])
    .order('fecha_inicio', { ascending: true })

  return { citasPaciente, errorCitasPaciente }
}

export async function createCitaByPaciente ({ data }: { data: CitasInsert }) {
  const { data: citasInsert, error: errorCitasInsert } = await supabase
    .from('citas')
    .insert({ ...data })
    .select('*, paciente:personas!citas_id_paciente_fkey(*), doctor:personas!citas_id_doctor_fkey(*) ')
    .single()
  return { citasInsert, errorCitasInsert }
}

export async function updateCitaByPaciente ({ data }: { data: CitasUpdate }) {
  const { data: citasUpdate, error: errorCitasUpdate } = await supabase
    .from('citas')
    .update({ ...data })
    .eq('id', data.id ?? '')
    .select('*, paciente:personas!citas_id_paciente_fkey(*), doctor:personas!citas_id_doctor_fkey(*) ')
    .single()
  return { citasUpdate, errorCitasUpdate }
}

export async function citaCancel (id: string) {
  const { data: citasCancel, error: errorCitasCancel } = await supabase
    .from('citas')
    .update({ estado: 'cancelada' })
    .eq('id', id)
    .select()
    .single()
  return { citasCancel, errorCitasCancel }
}

export async function citaCompleta (id: string) {
  const { data: citasCompleta, error: errorCitasCompleta } = await supabase
    .from('citas')
    .update({ estado: 'completada' })
    .eq('id', id)
    .select()
    .single()
  return { citasCompleta, errorCitasCompleta }
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

export async function getTotalPagesByExpedienteAndQuery ({
  expediente,
  query
}: {
  expediente: string
  query: string
}) {
  const { data: totalPages, error: errortotalPages } = await supabase.rpc(
    'get_diagnosticos_count_by_expediente_and_filter',
    {
      expediente_param: expediente,
      filtro_param: query
    }
  )

  return { totalPages, errortotalPages }
}

export async function getDiagnosticosByExpedienteAndQuery ({
  idExpediente,
  query = '',
  offset = 0,
  perPage = 6,
  currentPage = 1
}: {
  idExpediente: string
  query: string
  offset: number
  perPage: number
  currentPage: number
}) {
  offset = isNaN(offset) ? 0 : offset
  perPage = isNaN(perPage) ? 6 : perPage
  currentPage = isNaN(currentPage) ? 1 : currentPage

  const { data: diagnosticos, error } = await supabase.rpc(
    'get_diagnosticos_by_expediente_and_filter_pagination',
    {
      expediente_param: idExpediente,
      filtro_param: query,
      offset_param: offset,
      limit_param: currentPage * perPage
    }
  )

  return { diagnosticos, error }
}

export async function getConsultaByIdDiagnostico ({ idDiagnostico }: { idDiagnostico: string }) {
  const { data: consultaDiagnostico, error: errorConsultaDiagnostico } = await supabase
    .from('diagnosticos')
    .select('id, id_diagnosticador: personas(*), consultas(*)')
    .eq('id', idDiagnostico)

  return { consultaDiagnostico, errorConsultaDiagnostico }
}
