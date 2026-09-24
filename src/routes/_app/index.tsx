import { createFileRoute } from "@tanstack/react-router"
import * as PageHeader from "@/components/page/header"
import { useTranslation } from "react-i18next"

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <>
      <PageHeader.Root>
        <PageHeader.Bar>
          <PageHeader.Heading>
            <PageHeader.Title>{t("pages.dashboard.title")}</PageHeader.Title>
            <PageHeader.Description>
              {t("pages.dashboard.description")}
            </PageHeader.Description>
          </PageHeader.Heading>
          <PageHeader.Actions />
        </PageHeader.Bar>
      </PageHeader.Root>
    </>
  )
}
