import { getInfoPersona } from '@/app/actions'
import ActualizarPerfil from '@/app/components/actualizar-usuario'

export default async function PerfilDoctorPage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  console.log(usuario)
  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <>
      <ActualizarPerfil usuario={usuario ?? null} />
    </>
  )
}
