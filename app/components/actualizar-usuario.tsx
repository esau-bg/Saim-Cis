'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { type DropzoneState, useDropzone } from 'react-dropzone'
// import { uploadingImage } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useRouter } from 'next/navigation'
import { updatePersona, uploadAvatar } from '../actions'
import { PhotoIcon } from '@heroicons/react/24/solid'

const validationSchema = z.object({
  direccion: z.string().min(1, { message: 'La dirección es obligatoria' }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .regex(/^\d{4}-?\d{4}$/, {
      message: 'El telefono debe tener el formato dddd-dddd'
    }),
  descripcion: z.string().min(1, { message: 'Agrega una descripcion' }),
  id: z.string().min(1, { message: 'ID no disponible' }),
  avatarUrl: z.string().min(1, { message: 'Avatar no disponible' })
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function ActualizarPerfil ({ usuario }: { usuario: UserType }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Funcion que se ejecuta cuando se suelta el archivo en la dropzone
  const onDrop = async (acceptedFiles: File[]) => {
    // Verifica que se haya seleccionado al menos un archivo
    console.log('Archivo seleccionado: ', acceptedFiles[0])
  }

  const back = () => {
    router.back()
  }

  // Configuracion de la dropzone como manejar los eventos de arrastrar y soltar asi como la configuracion de los tipos de imagen que acepta
  // y si pueden arrastrarse mas de un archivo a la vez
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    acceptedFiles
  }: DropzoneState = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false,
    maxSize: 10000000
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      descripcion: usuario?.usuario.descripcion ?? 'No hay descripcion',
      telefono: usuario?.telefono ?? 'No hay telefono',
      direccion: usuario?.direccion ?? 'No hay direccion',
      id: usuario?.id ?? 'No hay id',
      avatarUrl: usuario?.usuario.avatar_url ?? 'No hay avatar'
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      if (acceptedFiles.length > 0) {
        const { data: dataUpload, error } = await uploadAvatar({ file: acceptedFiles[0] }) // Tipar data, error

        if (error) {
          toast.error(`Error al subir la imagen: ${error.message}`)
          return
        }

        // Actualiza el avatar_url con la url de la imagen subida
        data.avatarUrl = dataUpload.secure_url
      }

      if (!usuario || !usuario.id) {
        toast.error('Error: ID de usuario no disponible')
      }

      const { errorPersonaUpdate } = await updatePersona({ data })

      if (errorPersonaUpdate) {
        toast.error(errorPersonaUpdate.message)
        return
      }

      toast.success('Perfil actualizado correctamente')
      router.refresh()
    })
  }

  // Define tus clases de CSS
  const focusedClass = 'border-neutral-500 bg-neutral-500/10 text-neutral-500 dark:border-neutral-500 dark:bg-neutral-500/10 dark:text-neutral-500'
  const acceptClass = 'border-green-500 bg-green-500/10 text-green-500 dark:border-green-500 dark:bg-green-500/10 dark:text-green-500'
  const rejectClass = 'border-red-500 bg-red-500/10 text-red-500 dark:border-red-500 dark:bg-red-500/10 dark:text-red-500'

  // Utiliza una función para determinar qué clase aplicar
  const getClassName = () => {
    if (isDragReject) return rejectClass
    if (isDragAccept) return acceptClass
    if (isFocused) return focusedClass
  }

  return (
    <div className="sm:px-2 md:px-8 rounded-sm max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full container mx-auto py-6 grid sm:grid-cols-1"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className=" font-medium text-2xl text-gray-900 dark:text-white px-4">
              Perfil
            </h2>
            <div>
              <h4 className='text-lg text-gray-900 dark:text-white px-4'>
              ¡Hola <strong>{usuario?.nombre}</strong>!
              </h4>
            <p className="px-4 text-gray-600 dark:text-white">
            Actualiza tu perfil para que los demas usuarios puedan conocerte mejor.
            </p>

            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full px-4">
                <Label
                  htmlFor="about"
                  className="block font-medium text-gray-900 dark:text-white"
                >
                  Descripcion
                </Label>
                <div className="mt-2">

                  <Input
                    placeholder='Escribe algunas frases sobre ti...'
                    className={
                      errors.descripcion
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('descripcion')}
                  />
                  {errors.descripcion && (
                    <p className="italic text-red-500 mt-0">
                      {errors.descripcion?.message}
                    </p>
                  )}
                </div>

              </div>

              <div className="col-span-full px-4">
                <Label
                  htmlFor="cover-photo"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Fotografia de perfil
                </Label>

                {/* Dropzone necesario para realizar el Drag and drop */}
                <div
                  {...getRootProps()}
                  className={`mt-4 flex dark:text-gray-400 text-gray-600 flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10 transition-colors duration-500 ${getClassName()}`}
                >
                  <input name='file' {...getInputProps()} />
                  {
                    acceptedFiles.length > 0 ? (
                      <p>Imagen seleccionada: {acceptedFiles[0].name}</p>
                    ) : (
                      <>
                        {isDragAccept && <p>Suelta la imagen</p>}
                        {isDragReject && <p>Solo se permiten imágenes</p>}
                        {!isDragActive && (
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md  font-semibold text-sec focus-within:outline-none focus-within:ring-2 focus-within:ring-sec focus-within:ring-offset-2 hover:text-sec"
                              >
                                <span>Subir un archivo</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG hasta 10MB</p>
                          </div>
                        )}
                      </>
                    )
                  }

                  {/* Muestra la vista previa de la imagen seleccionada */}
                  {acceptedFiles.length > 0 && (
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(acceptedFiles[0])}
                        alt={`Imagen de ${usuario?.nombre}`}
                        className="h-40 w-40 mt-2 mx-auto rounded-full aspect-square object-cover border-4 border-blue-500/50"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold dark:text-white text-gray-900 px-4">
              Informacion Personal
            </h2>
            <p className="mt-1 text-gray-600 px-4">
              Utilice una dirección permanente donde pueda recibir correo.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="full-name"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Nombre Completo
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    defaultValue={`${usuario?.nombre} ${usuario?.apellido}`}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="dni"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  DNI
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="dni"
                    id="dni"
                    autoComplete="dni"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    value={usuario?.dni}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="email"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Correo Electronico
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    value={usuario?.correo ?? 'N/A'}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="birthdate"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Fecha Nacimiento
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="birthdate"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    defaultValue={usuario?.fecha_nacimiento}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="country"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Genero
                </Label>
                <div className="mt-2">
                  <select
                    id="genero"
                    name="genero"
                    autoComplete="genero-name"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs"
                    value={usuario?.genero}
                    disabled
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="phone"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Telefono
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="phone"
                    className={
                      errors.telefono
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    disabled={isPending}
                    {...register('telefono')}
                  />
                  {errors.telefono && (
                    <p className="italic text-red-500 mt-0">
                      {errors.telefono?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full px-4">
                <Label
                  htmlFor="street-address"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Dirrecion
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="street-address"
                    className={
                      errors.direccion
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    disabled={isPending}
                    {...register('direccion')}
                  />
                  {errors.direccion && (
                    <p className=" italic text-red-500 mt-0">
                      {errors.direccion?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              variant="secondary"
              onClick={back}
            >
              Cancelar
            </Button>
            <Button
              disabled={isPending}
              className="py-3 px-4 inline-flex bg-sec text-white items-center gap-x-2 font-semibold rounded-lg transition-colors duration-200  hover:bg-sec-var-600 hover:border-sec hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
              )}
              Actualizar
            </Button>
          </div>
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
