'use client'

export default function SaimNosotros () {
  return (
    <>
      <main className="container mx-auto py-6 text-justify animate-scroll-fade-up" id="nosotros">
        <div className="mx-auto grid max-w-7xl gap-x-8 px-6 lg:px-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              Sobre Nosotros
            </h2>
            <p className="my-2 text-md">
              Somos un centro medico que busca darle una buena atencion a
              nuestros pacientes con los mejores especialistas y con un equipo
              medico de ultima generación.
            </p>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden  dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="order-last sm:order-first">
                  <div className="pr-6">
                    <p className="peer my-4 text-gray-800 dark:text-white">
                      La misión de Saim CIS es proporcionar atención médica de
                      alta calidad y accesible a todos los habitantes de
                      Honduras. Nos comprometemos a mejorar la salud y el
                      bienestar de nuestra comunidad a través de servicios
                      médicos integrales, educación para la salud y programas de
                      prevención.
                    </p>
                  </div>
                </div>
                <div className="pl-16 relative before:block before:absolute before:h-1/6 before:w-4 before:bg-sec-var-700/[.50] before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-sec-var-300/[.50] overflow-hidden">
                  <div className="absolute top-0 left-0 bg-sec/[.50] w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-sec-var-600/[.50] transition-all ">
                    <h2 className="text-white font-bold text-3xl">Mision</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/mision%202.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-sec-var-700/[.50] before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-sec-var-300 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-sec/[.50] w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-sec-var-600/[.50] transition-all ">
                    <h2 className="text-white font-bold text-3xl text-center">
                      Vision
                    </h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/mision%204.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-6 py-4">
                    <p className="peer mb-6 text-gray-800 dark:text-white">
                      La visión de Saim CIS es ser reconocido como el líder en
                      atención médica en Honduras, estableciendo nuevos
                      estándares de cuidado y excelencia. Nos esforzamos por ser
                      el centro de elección para pacientes, médicos y empleados
                      debido a nuestra atención al paciente preeminente, nuestra
                      comprensión y compasión inigualables y nuestro compromiso
                      con la innovación en la atención médica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                Objetivos
                </h2>
            </div>
            <div className='py-4 mx-6 gap-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
                <div>
                    <span className="text-slate-800 dark:text-white text-lg font-bold">
                    Excelencia en la Calidad de la Atención:
                    </span>
                    <p className="my-2 text-md max-w-sm">
                    Comprometerse con altos estándares de calidad en el diagnóstico, tratamiento y cuidado de los pacientes, siguiendo las mejores prácticas y estándares internacionales.
                    </p>
                </div>
                <div>
                    <span className="text-slate-800 dark:text-white text-lg font-bold">
                    Profesionales Altamente Calificados:
                    </span>
                    <p className="my-2 text-md max-w-sm">
                    Contratar y retener a un equipo de profesionales médicos y de atención de la salud altamente calificados, incluyendo médicos, enfermeras, especialistas y personal de apoyo.
                    </p>
                </div>
                <div>
                    <span className="text-slate-800 dark:text-white text-lg font-bold">
                    Enfoque en la Experiencia del Paciente:
                    </span>
                    <p className="my-2 text-md max-w-sm">
                    Priorizar la satisfacción y comodidad del paciente en todas las interacciones, desde la reserva de citas hasta el seguimiento post-tratamiento.
                    </p>
                </div>
                <div>
                    <span className="text-slate-800 dark:text-white text-lg font-bold">
                    Mejora Continua y Evaluación de Resultados:
                    </span>
                    <p className="my-2 text-md max-w-sm">
                    Establecer sistemas de retroalimentación y evaluación para monitorear constantemente la calidad de la atención y buscar oportunidades de mejora continua.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
