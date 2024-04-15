import Footer from '@/app/components/footer'
import NavbarIndex from '@/components/navbar-index'
import SaimDoctores from './saim-doctors'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import Pagination from '@/components/pagination'
// import { getInfoDoctor } from '@/app/(pages)/doctor/actions'
// import { getDoctores } from '@/app/actions'
// import { toast } from 'react-toastify'

// import NavbarIndexClient from '@/components/navbar-index-client'

export default async function PageDoctores ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  // const { InfoMedico, errorMedico } = await getInfoDoctor({ id_doctor: '' })
  // if (errorMedico) {
  //   toast.error('Error al Obtener el horario de Medico')
  // }

  // if (!InfoMedico) {
  //   return (
  //     <div>
  //       <span>Error al obtener los datos del medico</span>
  //     </div>
  //   )
  // }

  // const { data, error } = await getDoctores()
  // if (error) {
  //   toast.error('Error al Obtener el horario de Medico')
  //   console.log(error, data)
  // }

  // if (!data) {
  //   return (
  //       <div>
  //         <span>Error al obtener los datos del medico</span>
  //       </div>
  //   )
  // }

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
    <div>
    <NavbarIndex />
    <SaimDoctores query={query} currentPage={currentPage} rol="doctor" permissons />
    <div className="my-2 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
    <Footer />
    </div>
  )
}
