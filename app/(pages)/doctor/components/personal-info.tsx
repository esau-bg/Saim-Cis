'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PersonalInfo ({ usuario }: { usuario: UserType }) {
  const router = useRouter()
  const currentDate = new Date()
  const createdAtDate = new Date(usuario?.usuario.created_at ?? currentDate)
  let antiguedad = 'N/A'

  const actualizarPerfil = () => {
    router.push('/perfil')
  }

  if (usuario?.usuario.created_at) {
    const diffYears = currentDate.getFullYear() - createdAtDate.getFullYear()
    const diffMonths = currentDate.getMonth() - createdAtDate.getMonth()
    const diffDays = Math.floor(
      (currentDate.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffYears > 0) {
      antiguedad = `${diffYears} año${diffYears > 1 ? 's' : ''}`
    } else if (diffMonths > 0) {
      antiguedad = `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`
    } else {
      antiguedad = `${diffDays} día${diffDays > 1 ? 's' : ''}`
    }
  }

  return (
    <div className="w-full flex-1 bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
        Informacion Personal
      </h4>
      <ul className=" divide-y mt-2 text-gray-700 dark:text-gray-300">
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5">Nombre Completo:</span>
          <span className="text-gray-500 truncate w-full md:w-fit ">
            {usuario?.nombre} {usuario?.apellido}{' '}
          </span>
        </li>
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5">Fecha Nacimiento:</span>
          <span className="text-gray-500 truncate w-full md:w-fit">
            {usuario?.fecha_nacimiento
              ? new Date(usuario.fecha_nacimiento).toLocaleDateString('es-HN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              : 'N/A'}
          </span>
        </li>
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5">Unido:</span>
          <span className="text-gray-500 truncate w-full md:w-fit">
            {usuario?.usuario.created_at
              ? new Date(usuario.usuario.created_at).toLocaleDateString(
                'es-HN',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )
              : 'N/A'}{' '}
            ({<span>{antiguedad}</span>})
          </span>
        </li>
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5">Telefono:</span>
          <span className="text-gray-500 truncate w-full md:w-fit">
            {usuario?.telefono ?? 'N/A'}
          </span>
        </li>
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5 ">Correo contacto:</span>
          <span className="text-gray-500 truncate w-full md:w-fit ">
            {usuario?.correo ?? 'N/A'}
          </span>
        </li>
        <li className="flex py-2 gap-2">
          <span className="font-bold w-fit max-w-2/5">Direccion:</span>
          <span className="text-gray-500 truncate w-full md:w-fit">
            {usuario?.direccion ?? 'N/A'}
          </span>
        </li>
      </ul>
      <div className='flex justify-center py-2'>
      <Button className=" py-4 px-4 inline-flex bg-blue-500 text-white items-center gap-x-2 font-semibold rounded-lg transition-colors duration-200 border hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      onClick={actualizarPerfil}
    >
      Actualizar perfil
    </Button>
      </div>
    </div>

  )
}
