import z from "zod"
import i18n from "@/lib/i18n"

export const LoginFormSchema = z.object({
  email: z
    .email(i18n.t("pages.auth.login.form.email.errors.invalid"))
    .min(1, i18n.t("pages.auth.login.form.email.errors.required")),
  password: z
    .string()
    .min(1, i18n.t("pages.auth.login.form.password.errors.required"))
    .min(6, i18n.t("pages.auth.login.form.password.errors.minLength")),
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
