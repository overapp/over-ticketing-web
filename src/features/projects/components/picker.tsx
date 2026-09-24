import * as React from "react"
import { ChevronDown, FolderClosed } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenu, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface ProjectItem {
  id: string
  name: string
  org: string
}

export interface ProjectSwitcherProps {
  projects: ProjectItem[]
  /** Id del progetto attivo (uso controllato). */
  value?: string
  /** Id del progetto attivo iniziale (uso non controllato, default: il primo). */
  defaultValue?: string
  onValueChange?: (id: string) => void
  /**
   * Contenuto mostrato al posto del selettore quando `projects` è vuoto.
   * Di default riprende lo stato vuoto "S12" del design system (icona in
   * badge circolare + titolo + descrizione), adattato alla sidebar.
   */
  emptyState?: React.ReactNode
}

function ProjectSwitcherEmptyState() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          disabled
          className="cursor-default border border-dashed border-border bg-transparent text-muted-foreground opacity-100 hover:bg-transparent"
        >
          <div className="grid min-w-0 flex-1 text-left leading-tight">
            <span className="truncate text-[13.5px] font-semibold text-foreground">
              Nessun progetto
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Non sei assegnato a nessun progetto
            </span>
          </div>
          <FolderClosed className="ml-auto size-4 shrink-0 text-muted-foreground/80" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function ProjectSwitcher({
  projects,
  value,
  defaultValue,
  onValueChange,
  emptyState,
}: ProjectSwitcherProps) {

    const { t } = useTranslation();
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? projects[0]?.id
  )
  const activeId = value ?? uncontrolledValue
  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0]

  function handleValueChange(id: string) {
    if (value === undefined) setUncontrolledValue(id)
    onValueChange?.(id)
  }

  if (projects.length === 0 || !activeProject) {
    return (
      <SidebarGroup className="mb-4">
        <SidebarGroupLabel className="uppercase">{t("shell.content.admin.projects.picker.title")}</SidebarGroupLabel>
        <SidebarGroupContent>
          {emptyState ?? <ProjectSwitcherEmptyState />}
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("shell.content.admin.active-project")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="border border-border bg-card data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-[13.5px] font-bold text-foreground">
                    {activeProject.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground/80">
                    {activeProject.org}
                  </span>
                </div>
                <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground/80" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--anchor-width) min-w-56"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuRadioGroup value={activeId} onValueChange={handleValueChange}>
                  {projects.map((project) => (
                    <DropdownMenuRadioItem
                      key={project.id}
                      value={project.id}
                      className={cn(
                        "flex-col items-start gap-0.5 py-2",
                        "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                        "data-[checked]:bg-accent data-[checked]:text-accent-foreground"
                      )}
                    >
                      <span className="text-[13px] font-semibold">{project.name}</span>
                      <span className="text-[11.5px] text-muted-foreground/80">
                        {project.org}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

/* -------------------------------------------------------------------------
 * Uso:
 *
 * <ProjectSwitcher
 *   projects={[
 *     { id: "ecommerce", name: "Sito E-commerce", org: "Acme Corp" },
 *     { id: "mobile", name: "App Mobile", org: "Acme Corp" },
 *     { id: "negozio", name: "Negozio Online", org: "Blu Retail SpA" },
 *   ]}
 *   value={activeProjectId}
 *   onValueChange={setActiveProjectId}
 * />
 *
 * // Nessun progetto assegnato: appare lo stato vuoto di default.
 * <ProjectSwitcher projects={[]} />
 *
 * // ...oppure uno stato vuoto custom (es. con una CTA):
 * <ProjectSwitcher
 *   projects={[]}
 *   emptyState={
 *     <div className="mx-2 rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
 *       Nessun progetto. <a href="/admin/projects/new" className="font-semibold text-accent-foreground">Creane uno</a>.
 *     </div>
 *   }
 * />
 * ---------------------------------------------------------------------- */