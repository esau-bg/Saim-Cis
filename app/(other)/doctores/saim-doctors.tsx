import { getUsersByRoleAndQuery } from '@/app/actions'
import SaimDoctoresClient from './saim-doctor-client'
// import { getUsersByRoleAndQuery } from "../../(actions)";

const ITEMS_PER_PAGE = 8

export default async function SaimDoctores ({
  query,
  currentPage,
  rol,
  permissons
}: {
  query: string
  currentPage: number
  rol: RolesPermissons
  permissons?: boolean
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulando una carga lenta
  const offset = (Number(currentPage) - 1) * ITEMS_PER_PAGE

  const { users, error } = await getUsersByRoleAndQuery({
    rol,
    query,
    offset,
    perPage: ITEMS_PER_PAGE,
    currentPage
  })

  if (error) {
    return (
      <div>
        <span>Error al obtener la informacion de los usuarios</span>
      </div>
    )
  }

  if (!users) {
    return (
      <div>
        <span>Error al obtener los usuarios</span>
      </div>
    )
  }
  return <SaimDoctoresClient users={users} permissons= {permissons} />
}
