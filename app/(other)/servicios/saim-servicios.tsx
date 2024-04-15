'use client'

export default function SaimServicios () {
  const stats = [
    { id: 1, value: 'Consulta General', description: 'Nuestros médicos generales ofrecen un enfoque holístico para su salud, abordando sus necesidades médicas generales con experiencia y empatía.', img: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg' },
    { id: 2, value: 'Pediatría', description: 'Con atención dedicada y compasiva, nuestros pediatras se especializan en la salud de los más pequeños, brindando cuidado integral desde el nacimiento hasta la adolescencia.', img: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg' },
    { id: 3, value: 'Cardiología', description: 'Nuestros cardiólogos expertos brindan evaluaciones exhaustivas y tratamientos precisos para cuidar de su salud cardiovascular.', img: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-light.svg' },
    { id: 4, value: 'Oftalmología', description: 'Nuestros oftalmólogos ofrecen evaluaciones y tratamientos para una amplia variedad de condiciones oculares, desde problemas de visión comunes hasta cirugías complejas.', img: 'https://example.com/oftalmologia.svg' },
    { id: 5, value: 'Dermatología', description: 'Con atención especializada en la piel, nuestros dermatólogos brindan diagnósticos precisos y tratamientos efectivos para una variedad de afecciones cutáneas.', img: 'https://example.com/dermatologia.svg' },
    { id: 6, value: 'Neurología', description: 'Nuestros neurólogos ofrecen evaluaciones y tratamientos para afecciones del sistema nervioso, como migrañas, epilepsia y enfermedades neurodegenerativas.', img: 'https://example.com/neurologia.svg' },
    { id: 7, value: 'Psiquiatría', description: 'Con experiencia en salud mental, nuestros psiquiatras brindan evaluaciones integrales y tratamientos para una variedad de trastornos psiquiátricos, incluida la depresión, la ansiedad y los trastornos del estado de ánimo.', img: 'https://example.com/psiquiatria.svg' },
    { id: 8, value: 'Odontología', description: 'Nuestros dentistas ofrecen servicios dentales preventivos, restaurativos y cosméticos para mantener su salud bucal y su sonrisa radiante.', img: 'https://example.com/odontologia.svg' },
    { id: 9, value: 'Urología', description: 'Nuestros urólogos brindan diagnóstico y tratamiento para trastornos del sistema urinario en hombres y mujeres, así como para enfermedades del sistema reproductivo masculino.', img: 'https://example.com/urologia.svg' }
  ]

  return (
    <>
      <div className="container mx-auto py-4 text-justify animate-scroll-fade-up" id="servicios">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="max-w-2xl text-center md:text-left py-5">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              Servicios
            </h2>
          </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {stats.map((stat) => (

            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col items-center gap-y-2"
            >
                <img src={stat.img} alt={stat.value} className="h-24 w-fit"/>
              <h4 className="text-base ">{stat.description}</h4>
              <p className="order-first text-xl font-semibold tracking-tight ">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
