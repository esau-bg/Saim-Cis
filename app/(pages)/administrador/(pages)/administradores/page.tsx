import { Suspense } from 'react'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import DataTable from '@/components/data-table'
import Search from '@/components/search-query'
import Pagination from '@/components/pagination'
import TitlePage from '@/components/title-page'
import DataTableSkeleton from '@/components/skeletons'
import { ModalAgregarAdministrador } from '../../components/modals/modal-agregar-administrador'

export default async function AdministradoresAdministradorPagina ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query ?? ''
  const currentPage = Number(searchParams?.page) ?? 1

  // obtenemos el total de paginas por el rol y el query
  const totalPages = await getTotalPagesByRoleAndQuery({
    role: 'administrador',
    query
  })

  if (totalPages === null) {
    return <ToastServer message='No se pudo obtener el total de paginas de administradores'/>
  }

  return (
    <main className="w-full px-8 py-2">
      <TitlePage title="Administrador" description="Listado de administradores" />
          <div className="my-2 flex flex-col items-center sm:flex-row gap-2 md:mt-8">
            <Search placeholder="Buscar administrador..." debounce={200} />
            <ModalAgregarAdministrador />
          </div>
          <Suspense fallback={<DataTableSkeleton/>}>
            <DataTable query={query} currentPage={currentPage} rol="administrador" permissons />
          </Suspense>
          <div className="my-2 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
    </main>
  )
}
