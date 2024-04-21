import { Suspense } from 'react'
// import { AgregarPaciente } from '../components/agregar-paciente'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import DataTable from '@/components/data-table'
import Search from '@/components/search-query'
import Pagination from '@/components/pagination'
import TitlePage from '@/components/title-page'
import DataTableSkeleton from '@/components/skeletons'
import { ModalAgregarPaciente } from '../../components/modals/modal-agregar-paciente'

export default async function PacientesAdministradorPagina ({
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
    role: 'paciente',
    query
  })

  if (totalPages === null) {
    return <ToastServer message='No se pudo obtener el total de paginas de pacientes'/>
  }

  return (
    <main className="w-full px-8 py-2">
      <TitlePage title="Pacientes" description="Listado de pacientes" />
          <div className="my-2 flex flex-col items-center sm:flex-row gap-2 md:mt-8">
            <Search placeholder="Buscar pacientes..." debounce={200} />
            <ModalAgregarPaciente />
          </div>
          <Suspense fallback={<DataTableSkeleton/>}>
            <DataTable query={query} currentPage={currentPage} rol="paciente" permissons />
          </Suspense>
          <div className="my-2 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
    </main>
  )
}
