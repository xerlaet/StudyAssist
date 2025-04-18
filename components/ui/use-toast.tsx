// components/ui/use-toast.ts

import * as React from "react"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast as useToastPrimitive,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"

export const useToast = useToastPrimitive

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport className="fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-sm" />
    </ToastProvider>
  )
}

interface ToastProps {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function ToastWrapper({ title, description, action, className }: ToastProps) {
  return (
    <Toast className={cn("bg-white text-black border shadow-lg", className)}>
      <div className="grid gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      <ToastClose />
    </Toast>
  )
}
