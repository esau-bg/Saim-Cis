'use server'
import TemplateEmailPassTemp from '@/components/html-email'
import { supabase } from '@/lib/supabase'
import { adminAuthClient } from '@/lib/supabase/auth-admin'
import nodemailer from 'nodemailer'

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

interface CreateConsultaPreclinica {
  peso: number
  estatura: number
  temperatura: number
  presion: string
  saturacion: string
  sintomas: string
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
  data,
  id
}: {
  data: CreateConsultaPreclinica
  id: string
}) {
  const { data: consulta, error: errorConsulta } = await supabase
    .from('consultas')
    .insert({
      id_expediente: id,
      peso: data.peso,
      estatura: data.estatura,
      temperatura: data.temperatura,
      presion_arterial: data.presion,
      saturacion_oxigeno: data.saturacion,
      sintomas: data.sintomas
    })
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
  persona
}: {
  email: string
  passwordTemp: string
  persona: Personas
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
    to: email,
    subject: `Bienvenido a SAIM CIS ${persona.nombre}! 🎉`,
    text: `Su contraseña temporal es: ${passwordTemp}`,
    html: TemplateEmailPassTemp({
      nombre: persona.nombre,
      temp_pass: passwordTemp
    })
  }

  const emailResponse = await transporter.sendMail(mailOptions)

  return emailResponse
}

export async function signUpWithEmailAndTempPass ({
  email,
  passwordTemp,
  id_persona
}: {
  email: string
  passwordTemp: string
  id_persona: string
}) {
  const { data: userCreate, error: errorUserCreate } =
    await adminAuthClient.createUser({
      email,
      password: passwordTemp,
      user_metadata: { id_persona, passwordTemp },
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
