'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'

export default function Search ({ placeholder, debounce }: { placeholder: string, debounce?: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, debounce ?? 500)

  return (
    <div className="relative flex flex-shrink-0 ">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <Input
        className="peer block w-full  py-[9px] pl-10 "
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
  )
}
