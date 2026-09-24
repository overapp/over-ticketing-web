import { Controller } from "react-hook-form"
import { useLoginFormContext } from "./provider"
import { Field, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "react-i18next"

interface PasswordFieldProps {
  placeholder?: string
}

export function PasswordField({ placeholder }: PasswordFieldProps) {
  const { form, disabled } = useLoginFormContext()
  const { t } = useTranslation()
  return (
    <Controller
      name="password"
      control={form!.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Label htmlFor="password">
            {t("pages.auth.login.form.password.label")}
          </Label>
          <FieldContent>
            <Input
              {...field}
              id="password"
              type="password"
              placeholder={
                placeholder ?? t("pages.auth.login.form.password.placeholder")
              }
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
            {fieldState.error?.message && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </FieldContent>
        </Field>
      )}
    />
  )
}
