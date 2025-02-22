"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "~/src/components/ui/toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "border-2",
              {
                "border-green-500 bg-green-50 dark:bg-green-900/20": variant === "default",
                "border-red-500 bg-red-50 dark:bg-red-900/20": variant === "destructive"
              }
            )}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className={cn({
                  "text-green-700 dark:text-green-300": variant === "default",
                  "text-red-700 dark:text-red-300": variant === "destructive"
                })}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={cn({
                  "text-green-600 dark:text-green-200": variant === "default",
                  "text-red-600 dark:text-red-200": variant === "destructive"
                })}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={cn({
              "text-green-700 hover:text-green-900": variant === "default",
              "text-red-700 hover:text-red-900": variant === "destructive"
            })} />
          </Toast>
        )
      })}
     <ToastViewport className="top-0 right-0 flex-col gap-2 w-full md:max-w-[420px] p-4" />
    </ToastProvider>
  )
}