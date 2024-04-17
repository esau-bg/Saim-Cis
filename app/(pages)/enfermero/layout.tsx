import { type Metadata } from 'next'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'
import { SidebarEnfermeroClient } from './components/sidebar-enfermero-client'

export const metadata: Metadata = {
  title: 'Enfermero',
  description: 'Pagina principal del enfermero'
}
export default async function EnfermeroLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'enfermero'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <SidebarEnfermeroClient user={usuario ?? null}/>
      <div className='p-4 sm:ml-[3.35rem] ease-in-out transition duration-500'>
        <div className='p-0  dark:border-gray-900 mt-14'>
          {children}
        </div>
      </div>
    </>
  )
}
