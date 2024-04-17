import type { Metadata } from 'next'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'
import { SidebarDoctorClient } from './components/sidebar-doctor-client'

export const metadata: Metadata = {
  title: 'Doctor',
  description: 'Pagina principal del doctor'
}

export default async function DoctorLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'doctor'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <SidebarDoctorClient user={usuario ?? null}/>
      <div className='p-4 sm:ml-[3.35rem] ease-in-out transition duration-500'>
        <div className='p-0  dark:border-gray-900 mt-14'>
          {children}
        </div>
      </div>
    </>
  )
}
