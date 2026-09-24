import { Controller } from "react-hook-form"
import { useLoginFormContext } from "./provider"
import { Field, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "react-i18next"
interface EmailFieldProps {
  placeholder?: string
}

export function EmailField({ placeholder }: EmailFieldProps) {
  const { form } = useLoginFormContext()
  const { t } = useTranslation()

  return (
    <Controller
      name="email"
      control={form!.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Label htmlFor="email">
            {t("pages.auth.login.form.email.label")}
          </Label>
          <FieldContent>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder={
                placeholder ?? t("pages.auth.login.form.email.placeholder")
              }
              aria-invalid={fieldState.invalid}
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
