import { Suspense } from 'react'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import DataTable from '@/components/data-table'
import Search from '@/components/search-query'
import Pagination from '@/components/pagination'
import TitlePage from '@/components/title-page'
import DataTableSkeleton from '@/components/skeletons'
import { ModalAgregarEnfermero } from '../../components/modals/modal-agregar-enfermero'

export default async function EnfermerosAdministradorPagina ({
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
    role: 'enfermero',
    query
  })

  if (totalPages === null) {
    return <ToastServer message='No se pudo obtener el total de paginas de enfermeroes'/>
  }

  return (
    <main className="w-full px-8 py-2">
      <TitlePage title="Enfermero" description="Listado de enfermeroes" />
          <div className="my-2 flex flex-col items-center sm:flex-row gap-2 md:mt-8">
            <Search placeholder="Buscar enfermero..." debounce={200} />
            <ModalAgregarEnfermero />
          </div>
          <Suspense fallback={<DataTableSkeleton/>}>
            <DataTable query={query} currentPage={currentPage} rol="enfermero" permissons />
          </Suspense>
          <div className="my-2 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
    </main>
  )
}
