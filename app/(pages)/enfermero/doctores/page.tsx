import { Suspense } from 'react'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import DataTable from '@/components/data-table'
import Search from '@/components/search-query'
import Pagination from '@/components/pagination'
import TitlePage from '@/components/title-page'
import DataTableSkeleton from '@/components/skeletons'

export default async function DoctoresAdministradorPagina ({
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
    role: 'doctor',
    query
  })

  if (totalPages === null) {
    return <ToastServer message='No se pudo obtener el total de paginas de doctores'/>
  }

  return (
    <main className="w-full px-8 py-2">
      <TitlePage title="Doctores" description="Listado de doctores" />
          <div className="my-2 flex items-center  gap-2 md:mt-8">
            <Search placeholder="Buscar doctor..." debounce={200} />
          </div>
          <Suspense fallback={<DataTableSkeleton/>}>
            <DataTable query={query} currentPage={currentPage} rol="doctor" citas />
          </Suspense>
          <div className="my-2 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
    </main>
  )
}
