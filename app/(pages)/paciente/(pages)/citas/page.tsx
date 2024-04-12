import { getInfoPersona } from '@/app/actions'
// import CitasPaciente from './calendar'
import CardMedicos from './components/CardMedicos'

export default async function CitasPacientePage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  if (!usuario) {
    return (<div>Loading...</div>)
  }

  return (
      <div >
        <CardMedicos/>
      </div>
  )
}
