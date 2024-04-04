'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
import { createDiagnostico, getEstadoConsultaAndChange } from '../../../actions'
import InputTags from './input-tags'
import { useRouter } from 'next/navigation'
// import { ModalHistorialDiagnostico } from './modals/modal-historial-diagnosticos'

const validationSchema = z.object({
  id_expediente: z.string(),
  id_consulta: z.string(),
  interno: z.boolean(),
  diferencial: z.boolean(),
  enfermedades: z
    .string()
    .min(1, { message: 'Es obligatorio ingresar al menos una enfermedad' }),
  observacion: z.string().min(1, { message: 'La observación es obligatoria' })
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function FormDiagnostic ({ consulta }: { consulta: Consultas }) {
  // Redireccionar hacia consultas
  const router = useRouter()

  // Funcion para redirijir hacia consultas y refrescar las consultas
  const handleRedirect = () => {
    router.push('/doctor/consultas')
    router.refresh()
  }

  const [isPending, startTransition] = useTransition()
  const [tags, setTags] = React.useState<string[]>([])
  const handleChildStateChange = (newTags: string[]) => {
    setTags(newTags)
  }

  const inputTagsRef = React.useRef<{ handleRemoveAllTags: () => void } | null>(
    null
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      enfermedades: '',
      observacion: '',
      id_expediente: consulta.id_expediente,
      id_consulta: consulta.id,
      interno: true,
      diferencial: false
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      if (tags.length > 1) {
        data.diferencial = true
      }
      // convirtiendo array de tags a string y agregando a la data que guardaremos
      data.enfermedades = tags.join(',')
      const { diagnostico, errorDiagnostico } = await createDiagnostico({
        data
      })

      if (errorDiagnostico) {
        toast.error('Error al guardar el diagnostico')
        return
      } else {
        toast.success('Los Datos han sido guardados Exitosamente!')
        await getEstadoConsultaAndChange({ idConsulta: consulta.id, estado: 'completada' })
        reset()

        // Remover tags después de una inserción exitosa
        inputTagsRef.current?.handleRemoveAllTags()
        handleRedirect()
      }

      if (!diagnostico) {
        toast.error('Error al crear el diagnostico')
      }
    })
  }
  return (
    <div className="grid gap-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="my-1.5" htmlFor="enfermedades">
              Enfermedades
            </Label>
            <div className="flex flex-col">
              <InputTags
                onChange={handleChildStateChange}
                ref={inputTagsRef}
                inputProps={{
                  ...register('enfermedades'),
                  placeholder: 'Ingresar enfermedades',
                  disabled: isPending,
                  className: errors.enfermedades
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }}
              />
              <p className="ml-1 text-gray-600 dark:text-white text-sm my-1.5">
                Ingrese una enfermedad o varias enfermedades separadas por comas
              </p>
            </div>
            {errors.enfermedades && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.enfermedades?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="my-1.5" htmlFor="observaciones">
              Observaciones
            </Label>
            <Input
              type="text"
              autoComplete="observacion"
              placeholder="Observaciones"
              disabled={isPending}
              className={
                errors.observacion
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('observacion')}
            />
            {errors.observacion && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.observacion?.message}
              </p>
            )}
          </div>

          <Button
            disabled={isPending}
            className="py-3 px-4 max-w-sm mx-auto inline-flex bg-blue-500 text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Agregar Diagnostico
          </Button>
        </div>

      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
