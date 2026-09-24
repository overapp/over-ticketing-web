import { AppLogo } from "../logo"
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "../ui/sidebar"

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="mx-auto my-4 items-center justify-center">
          <AppLogo className="w-auto" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
