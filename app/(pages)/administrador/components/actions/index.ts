import { supabase } from '@/lib/supabase'
import { adminAuthClient } from '@/lib/supabase/auth-admin'

export async function getUserByDNI ({ dni }: { dni: string }) {
  const { count: dataDni, error: errorDni } = await supabase
    .from('personas')
    .select('*', { count: 'exact', head: true })
    .eq('dni', dni)

  return { dataDni, errorDni }
}

export async function getUserByCorreo ({ correo }: { correo: string }) {
  const { count: dataCorreo, error: errorCorreo } = await supabase
    .from('personas')
    .select('*', { count: 'exact', head: true })
    .eq('correo', correo)

  return { dataCorreo, errorCorreo }
}

export async function verifyUser ({
  dni,
  correo
}: {
  dni: string
  correo: string
}) {
  const { dataDni, errorDni } = await getUserByDNI({ dni })
  const { dataCorreo, errorCorreo } = await getUserByCorreo({ correo })

  if (errorDni ?? errorCorreo) {
    return { error: errorDni ?? errorCorreo }
  }

  if ((dataDni ?? 0) > 0) {
    return { error: { message: 'El DNI ya está registrado' } }
  }

  if ((dataCorreo ?? 0) > 0) {
    return { error: { message: 'El correo ya está registrado' } }
  }

  return { error: null }
}

export async function createPersona ({ data }: { data: PersonasInsert }) {
  const { data: persona, error: errorPersona } = await supabase
    .from('personas')
    .insert({ ...data })
    .select('*')
    .single()
  return { persona, errorPersona }
}

export async function setRoleUser ({
  id,
  rol
}: {
  id: string
  rol: RolesPermissons
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
    return {
      data: null,
      error: { message: 'No se encontró la especialización' }
    }
  }

  const { data, error } = await supabase
    .from('especializacion_x_personas')
    .insert({ id_persona: id, id_especializacion: especializacion.id })
    .select('*')
    .single()

  return { data, error }
}

export async function setEspecializacionUser ({ idPersona, especializaciones }: { idPersona: string, especializaciones: Especializaciones[] }) {
  const { error: errorEspecializaciones } = await supabase
    .from('especializacion_x_personas')
    .insert(especializaciones.map(especializacion => ({ id_persona: idPersona, id_especializacion: especializacion.id })))

  return { errorEspecializaciones }
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

export function createRandomCode ({
  min = 1,
  max = 6,
  letras = true
}: {
  min: number
  max: number
  letras?: boolean
}) {
  const characters = letras
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    : '0123456789'
  const charactersLength = characters.length
  let randomCode = ''
  const length = Math.max(min, Math.min(max, charactersLength)) // Asegura que la longitud esté entre min y max
  for (let i = 0; i < length; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }
  return { randomCode }
}

export async function getEspecializacionesByRol ({
  rol
}: {
  rol: RolesPermissons
}) {
  const { data, error } = await supabase
    .from('especializaciones')
    .select('*, roles!inner(*)')
    .eq('roles.nombre', rol)

  return { data, error }
}
