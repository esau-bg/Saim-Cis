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
          <div className='flex items-center justify-center px-6 py-8'>
            <div>
                <div className="group relative flex scroll-mt-40 py-3 items-center">
                <h2 className="font-sans text-2xl font-semibold text-primary">Valores</h2>
                </div>
                <p className="font-sans font-light text-inherit !mb-4 text-gray-800 dark:text-white">Saim Cis es una institución médica comprometida en cultivar una cultura organizacional basada en principios éticos y valores humanos, brindando un ambiente propicio para el desarrollo personal y profesional de sus colaboradores.</p>
                <div className="mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                <div className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25">
                    <span className="my-6 grid h-24 w-24 place-items-center text-slate-800">Innovación
                    <svg className="mx-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.788 14.842h6.865v.557h-6.235v4.189h5.864v.557h-5.864v4.599h6.307v.557h-6.937V14.842zm7.48 0h.73l3.232 4.6 3.304-4.6L30.028 9l-7.383 10.925L26.45 25.3h-.758l-3.462-4.893-3.475 4.893h-.744l3.833-5.376-3.575-5.083zm8.454.557v-.557h7.823v.557h-3.604V25.3h-.63v-9.902h-3.59zm-24.523-.557h.787L13.833 31.4l-4.482-6.1-6.494-9.667-.029 9.668H2.2V14.842zm32.283 9.734a.225.225 0 01-.225-.233.225.225 0 11.45 0 .224.224 0 01-.225.233zm.618-.613h.337c.005.186.138.311.334.311.219 0 .343-.134.343-.386v-1.594h.342v1.596c0 .453-.257.714-.682.714-.4 0-.674-.253-.674-.64zm1.805-.02h.34c.029.214.234.35.53.35.275 0 .477-.145.477-.345 0-.172-.129-.276-.421-.346l-.285-.07c-.4-.096-.582-.293-.582-.624 0-.402.322-.67.804-.67.448 0 .776.268.796.648h-.334c-.032-.208-.21-.338-.467-.338-.27 0-.451.133-.451.336 0 .161.116.254.404.322l.243.061c.453.108.64.296.64.635 0 .432-.328.702-.85.702-.49 0-.82-.258-.844-.661z" fill="#000"></path>
                    </svg>
                    </span>
                </div>
                <div className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25">
                    <span className="my-6 grid h-24 w-24 place-items-center text-slate-800"> Profesionalismo
                    <svg className="mx-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.58 18.828c0-1.206-1.42-2.276-3.603-2.93.525-2.217.296-3.983-.75-4.58a1.673 1.673 0 00-.838-.21c-.975 0-2.208.681-3.453 1.86-1.244-1.17-2.473-1.847-3.447-1.847a1.657 1.657 0 00-.85.213c-1.04.599-1.256 2.354-.738 4.56-2.173.65-3.586 1.712-3.59 2.912-.003 1.202 1.423 2.276 3.606 2.928-.525 2.22-.298 3.983.75 4.58.254.143.544.215.836.21.977 0 2.21-.681 3.454-1.86 1.243 1.17 2.473 1.848 3.448 1.848.297.005.59-.069.85-.214 1.04-.598 1.255-2.353.738-4.552 2.172-.658 3.585-1.72 3.587-2.918zm-7.84-5.465c1.433-1.284 2.329-1.422 2.647-1.422a.826.826 0 01.424.101c.501.286.7 1.293.541 2.627-.04.34-.099.679-.175 1.013a17.111 17.111 0 00-2.202-.362 17.227 17.227 0 00-1.443-1.764c.067-.067.136-.13.207-.193zM17.4 19.82c.135.262.28.525.43.79.152.264.31.531.484.796a16.43 16.43 0 01-1.372-.256c.122-.444.278-.882.456-1.33h.001zm-.486-3.334c.443-.103.907-.189 1.388-.255-.175.259-.325.525-.483.803-.157.278-.296.525-.431.792a20.58 20.58 0 01-.474-1.34zm.912 2.335c.222-.467.46-.926.716-1.375.261-.455.54-.9.835-1.333a20.329 20.329 0 013.133.003c.29.425.568.876.83 1.323.263.446.505.913.722 1.37a19.746 19.746 0 01-1.55 2.708c-1.042.081-2.09.08-3.132-.003-.295-.43-.573-.87-.833-1.321a20.542 20.542 0 01-.714-1.371h-.007zm5.753-2.585c.476.066.937.152 1.372.254-.134.447-.288.888-.462 1.322a25.529 25.529 0 00-.903-1.576h-.007zm.483 4.363c.15-.265.294-.53.431-.794.175.456.35.904.473 1.342-.459.106-.921.19-1.387.253.17-.259.332-.526.49-.801h-.007zM20.94 14.15c.315.336.625.7.927 1.091-.305-.013-.61-.02-.915-.021-.31 0-.626 0-.933.021.29-.378.597-.742.92-1.09zm-3.883-2.101a.852.852 0 01.432-.098 2.3 2.3 0 01.909.23 6.838 6.838 0 011.75 1.186l.206.188a17.189 17.189 0 00-1.43 1.75c-.745.073-1.484.194-2.214.362a8.895 8.895 0 01-.175-.993c-.182-1.322.028-2.33.52-2.618l.002-.007zm-.927 8.877c-.328-.1-.652-.218-.97-.35-1.242-.525-2.013-1.2-2.013-1.776 0-.576.774-1.246 2.016-1.763.311-.129.629-.242.952-.34.218.726.486 1.436.798 2.126a17.302 17.302 0 00-.783 2.103zm4.027 3.344c-1.434 1.283-2.33 1.42-2.65 1.42a.822.822 0 01-.424-.102c-.5-.286-.7-1.292-.54-2.626.04-.34.098-.678.174-1.012.726.167 1.461.287 2.202.36.441.62.923 1.21 1.443 1.765l-.204.195zm.8-.79a15.73 15.73 0 01-.93-1.09c.306.013.612.02.918.02.31 0 .627 0 .933-.019-.303.389-.61.753-.922 1.089h.001zm3.884 2.101a.845.845 0 01-.434.104c-.32 0-1.226-.14-2.654-1.419l-.206-.188c.514-.55.99-1.136 1.427-1.75a16.97 16.97 0 002.217-.361c.077.34.138.672.175.993.173 1.32-.028 2.328-.527 2.614l.002.007zm1.89-4.98a10.8 10.8 0 01-.952.34 17.233 17.233 0 00-.8-2.127c.308-.682.57-1.384.786-2.1.33.1.652.216.97.35 1.241.524 2.013 1.199 2.012 1.775-.002.576-.774 1.239-2.017 1.756l.001.007zm-5.791-.178a1.607 1.607 0 10.003-3.214 1.607 1.607 0 00-.003 3.214zM10.26 9.13v19.372h21.372V9.13H10.26zm20.537 18.539h-19.7V9.965h19.7v17.704zm-14.881-5.935c-.526 2.22-.298 3.983.749 4.58.255.143.544.215.836.21.977 0 2.21-.681 3.455-1.86 1.242 1.17 2.472 1.848 3.447 1.848.298.005.591-.069.85-.214 1.04-.598 1.255-2.353.738-4.552 2.172-.651 3.585-1.712 3.587-2.911.002-1.2-1.42-2.276-3.603-2.93.525-2.217.296-3.983-.75-4.58a1.673 1.673 0 00-.838-.21c-.975 0-2.207.681-3.452 1.86-1.245-1.17-2.474-1.847-3.448-1.847a1.656 1.656 0 00-.85.213c-1.04.599-1.256 2.354-.738 4.56-2.173.65-3.585 1.712-3.589 2.912-.003 1.202 1.423 2.266 3.607 2.921h-.002zm4.238 2.537c-1.434 1.283-2.33 1.42-2.651 1.42a.822.822 0 01-.424-.102c-.5-.286-.7-1.292-.54-2.626.04-.34.099-.678.175-1.012.725.167 1.46.287 2.202.36.44.62.923 1.21 1.442 1.765l-.204.195zm4.34-6.459a24.446 24.446 0 00-.434-.79c-.152-.264-.315-.525-.476-.785.476.066.936.151 1.372.253-.128.433-.282.875-.46 1.322h-.002zm.476 3.326c-.458.106-.92.191-1.386.254.328-.517.633-1.05.914-1.595.178.442.335.893.469 1.35l.003-.009zm-.912-2.337a19.746 19.746 0 01-1.55 2.708c-1.042.081-2.09.08-3.132-.003a19.614 19.614 0 01-1.554-2.692c.222-.468.46-.927.716-1.377.26-.455.54-.899.835-1.332a20.326 20.326 0 013.133.003c.29.424.568.876.83 1.323.263.446.507.922.724 1.379l-.002-.008zm-5.744 2.605c-.461-.066-.92-.15-1.373-.255.13-.43.286-.875.464-1.322.136.262.282.525.433.79.15.264.3.523.476.787zm-.488-4.377c-.153.263-.297.525-.432.792a17.626 17.626 0 01-.48-1.334c.442-.103.906-.19 1.387-.256-.163.26-.318.527-.475.798zm3.13 6.452c-.315-.336-.626-.7-.93-1.09.305.013.611.02.917.02.31 0 .627 0 .934-.019-.291.376-.599.74-.922 1.089zm3.883 2.101a.845.845 0 01-.434.104c-.32 0-1.226-.14-2.654-1.419l-.206-.188c.514-.55.99-1.136 1.427-1.75a16.988 16.988 0 002.217-.361c.077.34.138.672.175.993.175 1.32-.026 2.328-.525 2.614v.007zm.925-8.87c.329.101.652.218.969.35 1.241.526 2.014 1.2 2.012 1.776-.002.576-.772 1.254-2.015 1.77-.3.123-.617.236-.953.338a17.24 17.24 0 00-.8-2.126c.308-.687.571-1.393.787-2.114v.007zm-4.027-3.342c1.434-1.283 2.33-1.421 2.648-1.421a.828.828 0 01.424.101c.5.286.7 1.292.54 2.626-.04.341-.098.68-.174 1.014a17.09 17.09 0 00-2.203-.362 17.227 17.227 0 00-1.442-1.765c.066-.072.137-.137.208-.2l-.001.007zm-.797.781c.315.336.625.7.927 1.091-.305-.013-.61-.02-.915-.021-.31 0-.626 0-.933.021.29-.378.597-.742.92-1.09zm-3.883-2.101a.852.852 0 01.432-.098 2.3 2.3 0 01.909.23 6.838 6.838 0 011.75 1.186l.206.188a17.189 17.189 0 00-1.43 1.75c-.745.073-1.484.194-2.214.362a8.895 8.895 0 01-.175-.993c-.182-1.322.028-2.33.52-2.618l.002-.007zm-1.894 4.988c.311-.129.629-.242.952-.34.218.726.486 1.436.798 2.126-.307.682-.57 1.384-.786 2.1-.329-.1-.652-.216-.97-.35-1.243-.524-2.013-1.199-2.013-1.774 0-.576.777-1.245 2.018-1.762zm5.777.175a1.608 1.608 0 101.605 1.609 1.605 1.605 0 00-1.605-1.618v.01zm0 0a1.608 1.608 0 101.605 1.609 1.605 1.605 0 00-1.605-1.618v.01zm0 0a1.608 1.608 0 101.605 1.609 1.605 1.605 0 00-1.605-1.618v.01zm8.64 1.618c0-1.206-1.42-2.276-3.603-2.929.525-2.218.296-3.983-.75-4.58a1.673 1.673 0 00-.838-.21c-.975 0-2.208.68-3.453 1.86-1.244-1.17-2.473-1.848-3.447-1.848a1.657 1.657 0 00-.85.214c-1.04.598-1.256 2.353-.738 4.56-2.173.65-3.586 1.711-3.59 2.912-.003 1.201 1.423 2.276 3.606 2.928-.525 2.219-.298 3.983.75 4.58.254.142.544.215.836.21.977 0 2.21-.681 3.454-1.86 1.243 1.17 2.473 1.847 3.448 1.847.297.006.59-.068.85-.213 1.04-.599 1.255-2.354.738-4.552 2.172-.662 3.585-1.724 3.587-2.923v.004zm-7.84-5.467c1.433-1.284 2.329-1.422 2.647-1.422a.828.828 0 01.424.102c.501.285.7 1.292.541 2.626-.04.34-.099.679-.175 1.014a17.111 17.111 0 00-2.202-.363 17.227 17.227 0 00-1.443-1.764c.067-.067.136-.13.207-.193zM17.4 19.82c.135.263.28.525.43.79.152.264.31.531.484.796a16.43 16.43 0 01-1.372-.256c.122-.444.278-.882.456-1.33h.001zm-.486-3.334c.443-.103.907-.188 1.388-.255-.175.259-.325.525-.483.803-.157.279-.296.525-.431.792-.173-.441-.332-.888-.474-1.34zm.912 2.336c.222-.468.46-.927.716-1.376.261-.455.54-.9.835-1.333a20.33 20.33 0 013.133.003c.29.425.568.876.83 1.323.263.446.505.913.722 1.37a19.744 19.744 0 01-1.55 2.709c-1.042.08-2.09.08-3.132-.004-.295-.429-.573-.87-.833-1.321a20.544 20.544 0 01-.714-1.37h-.007v-.002zm5.753-2.586c.476.067.937.152 1.372.254-.134.447-.288.888-.462 1.322a25.5 25.5 0 00-.903-1.576h-.007zm.483 4.363c.15-.265.294-.53.431-.793.175.455.35.903.473 1.341-.459.106-.921.19-1.387.253.17-.259.332-.526.49-.801h-.007zm-3.122-6.449c.315.336.625.7.927 1.091-.305-.013-.61-.02-.915-.021-.31 0-.626 0-.933.021.29-.378.597-.742.92-1.09zm-3.883-2.101a.852.852 0 01.432-.098 2.3 2.3 0 01.909.23 6.838 6.838 0 011.75 1.186l.206.188a17.189 17.189 0 00-1.43 1.75c-.745.073-1.484.194-2.214.362a8.895 8.895 0 01-.175-.993c-.182-1.322.028-2.33.52-2.618l.002-.007zm-.927 8.877c-.328-.1-.652-.218-.97-.35-1.242-.525-2.013-1.2-2.013-1.776 0-.576.774-1.246 2.016-1.763.311-.129.629-.242.952-.34.218.726.486 1.436.798 2.126a17.302 17.302 0 00-.783 2.103zm4.027 3.344c-1.434 1.283-2.33 1.42-2.65 1.42a.822.822 0 01-.424-.102c-.5-.286-.7-1.292-.54-2.626.04-.34.098-.678.174-1.012.726.167 1.461.287 2.202.36.441.62.923 1.21 1.443 1.765l-.204.195zm.8-.79a15.73 15.73 0 01-.93-1.09c.306.013.612.02.918.02.31 0 .627 0 .933-.019-.303.389-.61.753-.922 1.089h.001zm3.884 2.101a.845.845 0 01-.434.104c-.32 0-1.226-.14-2.654-1.419l-.206-.188c.514-.55.99-1.136 1.427-1.75a16.97 16.97 0 002.217-.361c.077.34.138.672.175.993.173 1.32-.028 2.328-.527 2.614l.002.007zm1.89-4.98a10.8 10.8 0 01-.952.34 17.233 17.233 0 00-.8-2.127c.308-.682.57-1.384.786-2.1.33.1.652.216.97.35 1.241.524 2.013 1.199 2.012 1.775-.002.576-.774 1.239-2.017 1.756l.001.007zm-5.791-.178a1.607 1.607 0 10.003-3.214 1.607 1.607 0 00-.003 3.214zM8.804 29.966v-19.38l-.84.841v19.374h21.369l.837-.835H8.804z" fill="#09D3AC"></path>
                    </svg>
                    </span>
                </div>
                <div className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25">
                    <span className="my-6 grid h-24 w-24 place-items-center text-slate-800"> Ética
                    <svg className="mx-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.397 26.388c.213 2.733.213 4.014.213 5.412h-6.322c0-.305.005-.583.01-.866.018-.878.036-1.794-.107-3.643-.188-2.708-1.354-3.31-3.497-3.31H9.75v-4.926h10.244c2.708 0 4.063-.823 4.063-3.005 0-1.917-1.355-3.08-4.063-3.08H9.75V8.15h11.373c6.13 0 9.177 2.896 9.177 7.521 0 3.46-2.144 5.716-5.04 6.092 2.445.489 3.874 1.88 4.137 4.625z" fill="#121212"></path>
                        <path d="M9.75 31.8v-3.672h6.685c1.116 0 1.359.828 1.359 1.322v2.35H9.75z" fill="#121212"></path>
                    </svg>
                    </span>
                </div>
                <div className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25">
                    <span className="my-6 grid h-24 w-24 place-items-center text-slate-800"> Respeto
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 28 28" focusable="false">
                        <title>Gatsby</title>
                        <circle cx="14" cy="14" r="14" fill="#639"></circle>
                        <path fill="#fff" d="M6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z"></path>
                    </svg>
                    </span>
                </div>
                </div>
            </div>
        </div>
        </div>
      </main>
    </>
  )
}
