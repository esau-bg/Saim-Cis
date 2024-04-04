import React from 'react'

export default function Tags ({ input }: { input: string }) {
  // Convertimos el string en un array separado por comas
  const tags = input.split(',')

  return (
    <>
        <div className='flex flex-wrap gap-1 w-full   ' >
            {tags.map((tag, index) => (
            <span
                key={index}
                className='bg-neutral-300 text-black dark:bg-slate-700 dark:text-white font-normal rounded-md px-2 py-1 text-xs capitalize'
            >
                {tag}
            </span>
            ))}
        </div>
    </>
  )
}
