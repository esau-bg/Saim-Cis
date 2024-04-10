import { getUsersByRoleAndQuery } from '@/app/actions'
import DataTableClient from './data-table-client'
// import { getUsersByRoleAndQuery } from "../../(actions)";

const ITEMS_PER_PAGE = 6

export default async function DataTable ({
  query,
  currentPage,
  rol,
  permissons,
  citas
}: {
  query: string
  currentPage: number
  rol: RolesPermissons
  permissons?: boolean
  citas?: boolean
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulando una carga lenta
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { users, error } = await getUsersByRoleAndQuery({
    rol,
    query,
    offset,
    perPage: ITEMS_PER_PAGE,
    currentPage
  })

  if (error) {
    console.log(error)
  }

  if (!users) {
    return (
      <div>
        <span>Error al obtener los usuarios</span>
      </div>
    )
  }
  return <DataTableClient users={users} permissons= {permissons} citas={citas} />
}
