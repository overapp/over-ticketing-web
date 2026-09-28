import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import * as LoginForm from "@/features/auth/components/form"
import { Separator } from "@/components/ui/separator"
import { login } from "@/features/auth/apis"

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {t} = useTranslation()

  async function handleSubmit(data: LoginForm.LoginFormSchemaType) {
    setIsLoading(true)
    setError(null)

    try {
      await login(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div>
            <h1 className="text-[28px] font-semibold">{t("pages.auth.login.title")}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {t("pages.auth.login.description")}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <LoginForm.Provider onSubmit={handleSubmit} disabled={isLoading}>
            <div className="space-y-6">
              <LoginForm.EmailField />
              <LoginForm.PasswordField />
              <LoginForm.Submit label={t("pages.auth.login.form.submit.label")} />
            </div>
          </LoginForm.Provider>
          <Separator />
          <div className="text-center">
            <p className="text-xs text-gray-600">
              {t("pages.auth.login.form.footer")} 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
