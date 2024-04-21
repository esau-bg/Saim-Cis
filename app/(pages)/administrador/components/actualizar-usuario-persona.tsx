'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
/* import { useRouter } from 'next/navigation' */
import { updateAuthUserEmail, updatePersona, uploadAvatar } from '@/app/actions/index'
import { getUserByCorreo, sendMailSingup } from '../../enfermero/actions'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { type DropzoneState, useDropzone } from 'react-dropzone'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

const validationSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(1, { message: 'El apellido es obligatorio' }),
  dni: z
    .string()
    .min(1, { message: 'El DNI es obligatorio' })
    .regex(/^\d{4}-?\d{4}-?\d{5}$/, {
      message: 'El DNI debe tener el formato dddd-dddd-ddddd'
    }),
  correo: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({
      message: 'Debe ser un correo electrónico válido'
    }),
  fecha_nacimiento: z
    .string()
    .min(1, { message: 'La fecha de nacimiento es obligatoria' }),
  genero: z.string().min(1, { message: 'El genero es obligatorio' }),
  direccion: z.string().min(1, { message: 'La dirección es obligatoria' }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .regex(/^\d{4}-?\d{4}$/, {
      message: 'El telefono debe tener el formato dddd-dddd'
    }),
  id: z.string().min(1, { message: 'ID no disponible' }),
  descripcion: z.string().min(1, { message: 'Agrega una descripcion' }),
  avatarUrl: z.string().min(1, { message: 'Avatar no disponible' })
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function ActualizarUsuarioPersona ({ usuario }: { usuario: UserType }) {
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  // Funcion que se ejecuta cuando se suelta el archivo en la dropzone
  const onDrop = async (acceptedFiles: File[]) => {
    // Verifica que se haya seleccionado al menos un archivo
    console.log('Archivo seleccionado: ', acceptedFiles[0])
  }
  const handleRecargar = () => {
    router.refresh() // Recarga la página
  }
  const handleRedirect = () => {
    router.back() // Retrocede en el historial
    // Espera 100 milisegundos antes de retroceder
    setTimeout(() => {
      router.refresh() // Recarga la páginarouter.refresh() // Recarga la página
    }, 100)
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
      nombre: usuario?.nombre ?? 'No hay nombre',
      apellido: usuario?.apellido ?? 'No hay apellido',
      dni: usuario?.dni ?? 'No hay dni',
      correo: usuario?.usuario.correo ?? 'No hay correo',
      fecha_nacimiento: usuario?.fecha_nacimiento ?? 'No hay fecha_nacimiento',
      genero: usuario?.genero ?? 'No hay genero',
      telefono: usuario?.telefono ?? 'No hay telefono',
      direccion: usuario?.direccion ?? 'No hay direccion',
      id: usuario?.id ?? 'No hay id ',
      descripcion: usuario?.usuario.descripcion ?? 'No hay descripcion',
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

      // Verificar si el correo ingresado es diferente al correo del usuario
      if (data.correo !== usuario?.usuario.correo) {
        const { dataCorreo } = await getUserByCorreo({
          correo: data.correo
        })
        // Mensaje de confirmacion previo a actualizar el correo
        const result = await new Promise((resolve) => {
          const confirmation = (
          <div>
            <p>¿Estás seguro de que deseas actualizar el correo electrónico?</p>
            <div className='flex justify-around mr-3'>
              <button className="bg-green-600 hover:bg-green-700 text-white font-light text-sm py-1 px-3 rounded" onClick={() => { resolve(true) }}>Confirmar</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-light text-sm py-1 px-3 rounded" onClick={() => { resolve(false) }}>Cancelar</button>
            </div>
          </div>
          )
          toast.info(() => confirmation, {
            autoClose: false,
            closeOnClick: true,
            closeButton: false
          })
        })

        if (!result) {
          toast.error('Operación cancelada')
          handleRecargar()
          return
        }

        // comprobamos que el nuevo correo no exista en la base de datos
        if (dataCorreo && dataCorreo?.length > 0) {
          toast.error('El correo ingresado ya está registrado en el sistema.')
          handleRecargar()
          return
        }
        // Crear un codigo de 6 digitos y letras como contraseña temporal
        const randomCode = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()

        // enviamos los correos (actual y nuevo) y la contrasenia temporal para actualizar el usuario anterior
        const { userUpdated, errorUserUpdated } = await updateAuthUserEmail({ email: usuario?.usuario.correo ?? '', newEmail: data.correo, newPasswordTemp: randomCode })
        if (errorUserUpdated) {
          toast.error(errorUserUpdated.message)
          handleRecargar()
          return
        }

        if (userUpdated) {
          toast.success('El correo electrónico ha sido actualizado correctamente')

          const { dataEmail, errorEmail } = await sendMailSingup({
            email: data.correo ?? '',
            nombrePersona: data.nombre,
            passwordTemp: randomCode
          })

          if (errorEmail) {
            toast.error('Error al enviar el correo electrónico')
            return
          }

          if (dataEmail) {
            toast.success('Correo electrónico enviado exitosamente')
            handleRecargar()
          }
        }
      }

      const { errorPersonaUpdate } = await updatePersona({ data })

      if (errorPersonaUpdate) {
        toast.error(errorPersonaUpdate.message)
        handleRecargar()
        return
      }

      toast.success('Perfil actualizado correctamente')
      handleRecargar()
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
      <div className="mx-2 flex justify-end items-center pr-10">
        <div className='ml-auto'>
          <Button
            variant={'secondary'}
            className="justify-start font-normal duration-500 hover:bg-sec hover:text-white"
            onClick={handleRedirect}
          >
            Regresar
            <ArrowLeftCircleIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      {/* <HeaderProfile usuario={usuario}/> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full container mx-auto py-6 grid sm:grid-cols-1"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-900/10">
            <h2 className=" font-medium text-2xl text-gray-900 dark:text-white px-4">
              Perfil de <strong>{usuario?.nombre}</strong>
            </h2>
            <div>
              <p className="px-4 text-gray-600 dark:text-white">
                Vista Previa del Perfil
              </p>
            </div>
            <div className="flex flex-col items-center pb-6">
              <img
                src={
                  usuario?.usuario.avatar_url ??
                  'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'
                }
                className="w-40 aspect-square object-cover border-4 border-white dark:border-slate-900 rounded-full bg-sec"
              />
              <p className="text-gray-700 dark:text-gray-300">
                {usuario?.usuario.descripcion ?? 'Sin descripción'}
              </p>
              <div className="flex flex-row gap-2 mt-2">
                {usuario?.role.map((rol, index) => (
                  <div key={index} className="flex gap-2">
                    {rol.especialidad.map((especialidad, i) => (
                      <span
                        className="capitalize bg-blue-100 dark:bg-sec-var-900 text-sec-var-800 dark:text-sec-var-200 rounded-md py-1 px-2 text-sm select-none"
                        key={i}
                      >
                        {especialidad}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
          <div className='flex gap-3 items-center'>
              <h2 className="font-semibold text-lg dark:text-white text-gray-900 px-4">
                Informacion Personal
              </h2>
              <div className="hs-tooltip inline-block [--placement:right]">

                <Button type="button"
                    size={'icon'}
                    variant={'ghost'}
                    className='hs-tooltip-toggle'
                    onClick={() => { setIsEditing(true) }}
                >
                  <PencilSquareIcon className="h-5 " />
                  <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-sec-var-900/90 text-xs font-medium text-white rounded shadow-sm  " role="tooltip">
                    Actualizar datos
                  </span>
                </Button>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-6 mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="full-name"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Nombres
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="name"
                    defaultValue={`${usuario?.nombre}`}
                    disabled={isPending || !isEditing}
                    className={
                      errors.nombre
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('nombre')}
                  />
                  {errors.nombre && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.nombre?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3 px-4">
                <Label
                  htmlFor="apellido"
                  className="block font-medium dark:text-white text-gray-900"
                >
                  Apellidos
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    id="apellido"
                    autoComplete="apellido"
                    defaultValue={usuario?.apellido}
                    disabled={isPending || !isEditing}
                    className={
                      errors.apellido
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('apellido')}
                  />
                  {errors.apellido && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.apellido?.message}
                    </p>
                  )}
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
                    id="dni"
                    autoComplete="dni"
                    defaultValue={usuario?.dni}
                    disabled={isPending || !isEditing}
                    className={
                      errors.dni
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('dni')}
                  />
                  {errors.dni && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.dni?.message}
                    </p>
                  )}
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
                    type="email"
                    autoComplete="email"
                    defaultValue={usuario?.usuario.correo ?? 'N/A'}
                    disabled={isPending || !isEditing}
                    className={
                      errors.correo
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('correo')}
                  />
                  {errors.correo && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.correo?.message}
                    </p>
                  )}
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
                    defaultValue={usuario?.fecha_nacimiento}
                    disabled={isPending || !isEditing}
                    className={
                      errors.fecha_nacimiento
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }
                    {...register('fecha_nacimiento')}
                  />
                  {errors.fecha_nacimiento && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.fecha_nacimiento?.message}
                    </p>
                  )}
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
                    autoComplete="genero-name"
                    value={usuario?.genero}
                    disabled={isPending || !isEditing}
                    className={`p-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                      errors.genero
                        ? 'border-red-500  !placeholder-red-500 text-red-500'
                        : ''
                    }`}
                    {...register('genero')}
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                  {errors.genero && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.genero?.message}
                    </p>
                  )}
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
                    disabled={isPending || !isEditing}
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
                    disabled={isPending || !isEditing}
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
                    disabled={isPending || !isEditing}
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

                  {/* Dropzone necesario para realizar el Drag and drop */}
                  {isEditing && (
                    <div className="col-span-full px-4 mt-4">
                      <Label
                        htmlFor="cover-photo"
                        className="block font-medium dark:text-white text-gray-900"
                      >
                        Fotografia de perfil
                      </Label>
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
                  )}
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              className='bg-slate-500 hover:bg-slate-600 text-white hover:text-white focus:outline-none'
              onClick={handleRecargar}
            >
              Cancelar
            </Button>
            <Button
              disabled={isPending || !isEditing}
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
