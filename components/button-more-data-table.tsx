'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function ButtonMoreDataTable ({ trigger, children, className }: {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <Popover>
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
    <PopoverContent className={className}>{children}</PopoverContent>
    </Popover>
  )
}
