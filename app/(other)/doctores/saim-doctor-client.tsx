import * as React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export default function SaimDoctoresClient ({
  users,
  permissons
}: {
  users: DataTableUsers
  permissons?: boolean
}) {
  return (
    <>
      <div className="container mx-auto py-4 text-justify animate-scroll-fade-up" id="doctores">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-center md:text-left py-5">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">Nuestros Doctores</h2>
          </div>
          <div>
            <p className="mt-6 text-lg leading-8 ">
              En nuestro centro médico, contamos con un equipo de doctores altamente calificados y comprometidos con la excelencia en la atención médica. Cada uno de nuestros profesionales tiene una vasta experiencia en su especialidad, brindando un enfoque integral y personalizado a cada paciente.
            </p>
          </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 p-6">
              {users?.map((dataDoctor) => (
                <Card key={dataDoctor.id} className={`overflow-hidden hover:scale-105 transition-transform cursor-pointer ${
                  dataDoctor.id ? 'ring-2 ring-ring ring-sec ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' : ''
                }`}>
                  <CardContent className="p-1 relative">
                    <img
                      className="w-100 object-cover shadow-sm rounded-lg aspect-square border-white dark:border-slate-900 bg-sec"
                      src={dataDoctor.url_avatar ?? 'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'}
                      alt="Avatar"
                    />
                    <CardFooter className="w-full flex-col overflow-hidden absolute bg-white/30 bottom-0 start-0 border-t-1 border-zinc-100/50 justify-between p-2 backdrop-blur-sm">
                      <p className="text-tiny text-sec uppercase font-bold w-full">{dataDoctor.nombre} {dataDoctor.apellido}</p>
                      <p className="text-tiny text-neutral-500 capitalize text-sm w-full">Especialidad: {dataDoctor.nombre_rol}</p>
                      <span className="text-black font-medium w-full truncate">{dataDoctor.correo}</span>
                    </CardFooter>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </>
  )
}
