import type { Metadata } from 'next'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'
import NavbarAdministradorClient from './components/navbar-administrador-client'

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
      <NavbarAdministradorClient user={usuario ?? null} />
      {children}
    </>
  )
}
