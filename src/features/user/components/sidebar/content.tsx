import { SidebarGroupContent, SidebarContent, SidebarMenuItem, SidebarGroup, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { ProjectSwitcher } from "@/features/projects/components/picker";
import { Link } from "@tanstack/react-router";
import { TicketIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function UserSidebarContent() {
  const {t} = useTranslation();
  return <SidebarContent>
    <ProjectSwitcher
      projects={[
      ]}
    />
    <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link to={'/'} />} className="font-bold">
                <TicketIcon className="mr-2" />
                {t("shell.content.admin.tickets.title")}
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton render={<Link to={'/'} />}>
                    {t("shell.content.admin.tickets.assigned-to-me")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuSubButton render={<Link to={'/'} />}>
                    {t("shell.content.admin.tickets.to-assign")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuSubButton render={<Link to={'/'} />}>
                    {t("shell.content.admin.tickets.urgent")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuSubButton render={<Link to={'/'} />}>
                    {t("shell.content.admin.tickets.recently-closed")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
}