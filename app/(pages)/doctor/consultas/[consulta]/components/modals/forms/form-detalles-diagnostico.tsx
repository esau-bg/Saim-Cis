'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'

export function FormDetallesDiagnostico ({ diagnostico }: { diagnostico: SendInfoDiagnostico | null }) {
  const [isPending] = useTransition()

  return (
    <div className="grid gap-6">
      <form>
        <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col ">
              <Label className="mb-2" htmlFor="Fecha">
                Fecha
              </Label>

              <Input
                type="text"
                autoCapitalize="none"
                autoComplete="Fecha"
                autoCorrect="off"
                disabled
                defaultValue={`${diagnostico?.fecha_diagnostico}`}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Enfermedades">
                Enfermedades
              </Label>
              <Input
                placeholder="Enfermedades"
                type="text"
                autoCapitalize="none"
                autoComplete="Enfermedades"
                autoCorrect="off"
                disabled
                defaultValue={`${diagnostico?.enfermedades}`}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Observacion">
                Observacion
              </Label>
              <Input
                type="text"
                autoCapitalize="none"
                autoComplete="Observacion"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${diagnostico?.observacion}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Diferencial">
                Diferencial
              </Label>
              <Input
                type="text"
                autoCapitalize="none"
                autoComplete="Diferencial"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${diagnostico?.diferencial}`}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Interno">
                Interno
              </Label>
              <Input
                placeholder="dd"
                type="text"
                autoCapitalize="none"
                autoComplete="Interno"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${diagnostico?.interno}`}
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
