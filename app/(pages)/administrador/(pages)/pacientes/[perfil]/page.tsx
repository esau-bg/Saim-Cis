import { getPerfil } from '@/app/actions'
import ActualizarUsuarioPersona from '../../../components/actualizar-usuario-persona'

export default async function PerfilPacienteAdminPage ({
  params
}: {
  params: { perfil: string }
}) {
  const idPersona = params.perfil
  const { usuario, errorUsuario } = await getPerfil({ idPersona })

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <>
      <ActualizarUsuarioPersona usuario={usuario ?? null} />
    </>
  )
}
