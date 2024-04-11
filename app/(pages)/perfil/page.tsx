import { getInfoPersona } from '@/app/actions'
import ActualizarPerfil from '@/app/components/actualizar-usuario'
import NavbarIndexClient from '@/components/navbar-index-client'

export default async function PerfilPage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <>
      <NavbarIndexClient user={usuario ?? null} />
      <ActualizarPerfil usuario={usuario ?? null} />
    </>
  )
}
