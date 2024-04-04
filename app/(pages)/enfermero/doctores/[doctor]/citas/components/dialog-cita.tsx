'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { formatFecha } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
export default function DialogCita ({ isOpen, setIsOpen, eventSelected }: { eventSelected: Events | null, setIsOpen: (isOpen: boolean) => void, isOpen: boolean }) {
  function toLocalISOString ({ date }: { date: Date }) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - offset * 60 * 1000)
    return date.toISOString().slice(0, -1)
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className='capitalize'>
          Cita: {eventSelected?.info?.descripcion}
        </AlertDialogTitle>
        <AlertDialogDescription>
          Información de la cita
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form className='grid gap-3'>
        <aside className='grid gap-3'>
          <div>
            <Label className=' text-lg'>Informacion del paciente</Label>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label className='' htmlFor='first-name'>
                Nombre Paciente
              </Label>
              <Input
                placeholder='Nombre'
                type='text'
                autoCapitalize='none'
                autoComplete='first-name'
                autoCorrect='off'
                autoFocus
                defaultValue={
                  eventSelected?.info?.paciente?.nombre ?? 'No disponible'
                }
                disabled
              />
            </div>
            <div className='grid gap-2'>
              <Label className='' htmlFor='family-name'>
                Apellido Paciente
              </Label>
              <Input
                placeholder='Apellidos'
                type='text'
                autoCapitalize='none'
                autoComplete='family-name'
                autoCorrect='off'
                defaultValue={
                  eventSelected?.info?.paciente?.apellido ?? 'No disponible'
                }
                disabled
              />
            </div>
            <div className='grid gap-2'>
              <Label className='' htmlFor='first-name'>
                Nombre Doctor
              </Label>
              <Input
                placeholder='Nombre'
                type='text'
                autoCapitalize='none'
                autoComplete='first-name'
                autoCorrect='off'
                autoFocus
                defaultValue={
                  eventSelected?.info?.paciente?.nombre ?? 'No disponible'
                }
                disabled
              />
            </div>
            <div className='grid gap-2'>
              <Label className='' htmlFor='first-name'>
                Especialidad Doctor
              </Label>
              <Input
                placeholder='Especialidad'
                type='text'
                autoCapitalize='none'
                autoComplete='first-name'
                autoCorrect='off'
                autoFocus
                defaultValue={
                  eventSelected?.info?.paciente?.nombre ?? 'No disponible'
                }
                disabled
              />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label className='' htmlFor='genero'>
                Genero
              </Label>
              <Input
                placeholder='Nombre'
                type='text'
                autoCapitalize='none'
                autoComplete='first-name'
                autoCorrect='off'
                autoFocus
                defaultValue={
                  eventSelected?.info?.paciente?.genero ?? 'No disponible'
                }
                disabled
              />
            </div>
            <div className='grid gap-2'>
              <Label className='' htmlFor='fecha-nacimiento'>
                Fecha de nacimiento
              </Label>
              <Input
                placeholder='Apellidos'
                type='text'
                autoCapitalize='none'
                autoComplete='family-name'
                autoCorrect='off'
                defaultValue={
                  eventSelected?.info?.paciente?.fecha_nacimiento
                    ? formatFecha(
                      new Date(
                        eventSelected?.info?.paciente?.fecha_nacimiento
                      ),
                      'es-HN'
                    )
                    : 'No disponible'
                }
                disabled
              />
            </div>
          </div>
        </aside>

        <aside className='grid gap-3'>
          <div>
            <Label className=' text-lg'>Detalles de la cita</Label>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label className='' htmlFor='first-name'>
                Fecha de inicio
              </Label>
              <Input
                type='datetime-local'
                defaultValue={
                  eventSelected?.start
                    ? toLocalISOString({
                      date: new Date(eventSelected?.start.toISOString())
                    })
                    : new Date().toISOString().split('Z')[0]
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label className='' htmlFor='family-name'>
                Fecha de finalización
              </Label>
              <Input
                type='datetime-local'
                defaultValue={
                  eventSelected?.end
                    ? toLocalISOString({
                      date: new Date(eventSelected?.end.toISOString())
                    })
                    : new Date().toISOString().split('Z')[0]
                }
              />
            </div>
          </div>
        </aside>
      </form>
      <AlertDialogFooter>
        <footer className='w-full flex justify-between '>
          {/* <Button asChild variant={'link'}>
              <Link href={`calendario/${eventSelected?.info?.id}`}>
                Ver detalles
              </Link>
          </Button> */}
          <div className='flex gap-2'>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            <AlertDialogAction disabled>Guardar</AlertDialogAction>
          </div>
        </footer>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
