import {
  AppSidebarHeader,
  AppSidebarContent,
  AppSidebarFooter,
} from "@/components/sidebar"
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebarHeader />
        <AppSidebarContent />
        <AppSidebarFooter />
      </Sidebar>
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
