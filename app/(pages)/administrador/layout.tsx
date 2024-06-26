import type { Metadata } from 'next'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'
import { SidebarAdministradorClient } from '@/app/(pages)/administrador/components/sidebar-administrador-client'

export const metadata: Metadata = {
  title: 'Administrador',
  description: 'Pagina principal del administrador'
}

export default async function AdministradorLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'administrador'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <SidebarAdministradorClient user={usuario ?? null}/>
      <div className='px-2 py-4 sm:ml-[3.35rem] ease-in-out transition duration-500'>
        <div className='mt-14'>
          {children}
        </div>
      </div>
    </>
  )
}
