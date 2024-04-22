import { getInfoPersona } from '@/app/actions'
import CitasInfo from './components/citas-info'
import PersonalInfo from './components/personal-info'
import { type Metadata } from 'next'
import HeaderProfile from '@/app/components/header-profile'

export const metadata: Metadata = {
  title: 'Doctor',
  description: 'Pagina de doctor.'
}

export default async function DoctorPage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <main className='px-8 py-2'>
      <HeaderProfile usuario={usuario ?? null} />
      <aside className='flex flex-col md:flex-row w-full md:space-x-4 '>
        <section className='my-4 flex-col  space-y-4 w-full '>
          <PersonalInfo usuario={usuario ?? null} />
        </section>
        <section className='my-4 flex-row md:flex-col  space-y-4 w-full min-w-[311px] md:w-[350px]'>
          <CitasInfo usuario={usuario ?? null} />
        </section>
      </aside>
    </main>
  )
}
