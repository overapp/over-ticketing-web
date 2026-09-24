import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import * as PageHeader from "@/components/page/header"

export const Route = createFileRoute("/_app/profile/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <PageHeader.Root>
      <PageHeader.Bar>
        <PageHeader.Heading>
          <PageHeader.Title>{t("pages.profile.index.title")}</PageHeader.Title>
          <PageHeader.Description>
            {t("pages.profile.index.description")}
          </PageHeader.Description>
        </PageHeader.Heading>
        <PageHeader.Actions />
      </PageHeader.Bar>
    </PageHeader.Root>
  )
}
