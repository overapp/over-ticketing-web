import { createContext, use } from "react"
import type { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormSchema } from "./schema"
import type { LoginFormSchemaType } from "./schema"

type LoginFormContextType = {
  form?: UseFormReturn<LoginFormSchemaType>
  disabled?: boolean
}

const LoginFormContext = createContext<LoginFormContextType>({
  disabled: false,
})

interface LoginFormProviderProps {
  children: ReactNode
  onSubmit: (data: LoginFormSchemaType) => Promise<void> | void
  disabled?: boolean
}

export function Provider({
  children,
  onSubmit,
  disabled = false,
}: LoginFormProviderProps) {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isDisabled = disabled || form.formState.isSubmitting

  return (
    <LoginFormContext.Provider value={{ form, disabled: isDisabled }}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </LoginFormContext.Provider>
  )
}

export function useLoginFormContext() {
  const context = use(LoginFormContext)
  if (!context) throw new Error("Must be within LoginForm.Provider")
  return context
}
