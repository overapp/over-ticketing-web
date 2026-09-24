import { AdminSidebarContent } from "@/features/admin/components/sidebar/content"
import { useUser } from "@/features/auth/hooks/use-user"
import { UserSidebarContent } from "@/features/user/components/sidebar/content"
import { SupportSidebarContent } from "@/features/support/components/sidebar/content"
import { SidebarContent } from "../ui/sidebar"

export function AppSidebarContent() {

  const {roles} = useUser()

  if(roles.includes("admin")) {
    return <AdminSidebarContent />
  } else if(roles.includes("support")) {
    return <SupportSidebarContent />
  } else if(roles.includes("user")) {
    return <UserSidebarContent />
  } else {
    return <SidebarContent></SidebarContent>
  }
}
