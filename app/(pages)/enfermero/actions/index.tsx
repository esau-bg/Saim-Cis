'use server'

import { supabase } from '@/lib/supabase'
import { adminAuthClient } from '@/lib/supabase/auth-admin'

interface CreatePersona {
  correo: string
  nombre: string
  apellido: string
  dni: string
  fecha_nacimiento: string
  direccion: string
  telefono: string
  genero: string
}

export async function createPersona ({ data }: { data: CreatePersona }) {
  const { data: persona, error: errorPersona } = await supabase
    .from('personas')
    .insert({ ...data, rol: 'paciente' })
    .select('*')
    .single()
  return { persona, errorPersona }
}

// creando una consulta nueva (enfermero)
export async function createConsulta ({
  data
}: {
  data: ConsultasInsert
}) {
  const { data: consulta, error: errorConsulta } = await supabase
    .from('consultas')
    .insert({ ...data })
    .select('*')
    .single()
  return { consulta, errorConsulta }
}

export async function getExpedienteByIDPaciente ({ id }: { id: string }) {
  const { data: dataID, error: errorID } = await supabase
    .from('expedientes')
    .select('id')
    .eq('id_persona', id)
    .single()

  return { dataID, errorID }
}

export async function setRolePacienteUser ({
  id,
  rol
}: {
  id: string
  rol: string
}) {
  // Obtener el id de la especializacion por el nombre del rol
  const { data: especializacion, error: especializacionError } = await supabase
    .from('especializaciones')
    .select('id')
    .eq('nombre', rol)
    .single()

  if (especializacionError) {
    return { data: null, error: especializacionError }
  }
  if (!especializacion) {
    return { data: null, error: 'No se encontro la especializacion' }
  }

  const { data, error } = await supabase
    .from('especializacion_x_personas')
    .insert({ id_persona: id, id_especializacion: especializacion.id })
    .select('*')
    .single()

  return { data, error }
}

export async function sendMailSingup ({
  email,
  passwordTemp,
  nombrePersona
}: {
  email: string
  passwordTemp: string
  nombrePersona: string
}) {
  // Utilizar resend para enviar el correo desde api server
  const { data: emailResponse } = await fetch('/api/resend/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, nombrePersona, passwordTemp })
  })
    .then(async (res) => await res.json())
    .catch((error) => ({ error }))

  return emailResponse
}

export async function signUpWithEmailAndTempPass ({
  email,
  passwordTemp,
  idPersona
}: {
  email: string
  passwordTemp: string
  idPersona: string
}) {
  const { data: userCreate, error: errorUserCreate } =
    await adminAuthClient.createUser({
      email,
      password: passwordTemp,
      user_metadata: { id_persona: idPersona, passwordTemp },
      email_confirm: true
    })

  return { userCreate, errorUserCreate }
}

export async function getUsersByRol ({ role }: { role: string }) {
  const { data: usuario, error: errorUsuario } = await supabase
    .from('personas')
    .select('*')
    .eq('rol', role)

  return { usuario, errorUsuario }
}

export async function getUserByDNI ({ dni }: { dni: string }) {
  const { data: dataDni, error: errorDni } = await supabase
    .from('personas')
    .select('*')
    .eq('dni', dni)

  return { dataDni, errorDni }
}

export async function getUserByCorreo ({ correo }: { correo: string }) {
  const { data: dataCorreo, error: errorCorreo } = await supabase
    .from('personas')
    .select('*')
    .eq('correo', correo)

  return { dataCorreo, errorCorreo }
}

export async function getCitasByDoctor ({ id_doctor: idDoctor }: { id_doctor: string }) {
  const { data: citas, error: errorCitas } = await supabase
    .from('citas')
    .select('*, paciente:personas!citas_id_paciente_fkey(*), doctor:personas!citas_id_doctor_fkey(*)')
    .eq('id_doctor', idDoctor)
    .order('fecha_inicio', { ascending: true })

  return { citas, errorCitas }
}

export async function updateCita ({
  id,
  data
}: {
  id: string
  data: CitasUpdate
}) {
  const { data: cita, error: errorCita } = await supabase
    .from('citas')
    .update({ ...data })
    .eq('id', id)
    .select('*')
    .single()

  return { cita, errorCita }
}
