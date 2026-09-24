import * as React from "react"

import { cn } from "@/lib/utils"
import { useRender } from "@base-ui/react/use-render"

type Render =
  | React.ReactElement
  | ((
      props: Record<string, any>,
      state: Record<string, any>
    ) => React.ReactElement)

type PageHeaderSize = "default" | "detail"

const PageHeaderContext = React.createContext<{ size: PageHeaderSize }>({
  size: "default",
})

/* ---------- Root ---------- */

export interface PageHeaderRootProps extends React.ComponentProps<"div"> {
  size?: PageHeaderSize
  render?: Render
}

export function Root({
  size = "default",
  className,
  render = <div />,
  children,
  ...props
}: PageHeaderRootProps) {
  return (
    <PageHeaderContext.Provider value={{ size }}>
      {useRender({
        render,
        props: {
          ...props,
          className: cn(
            "border-b border-border px-9",
            size === "default" ? "pt-[30px] pb-[22px]" : "pt-[22px] pb-[18px]",
            className
          ),
          children,
        },
      })}
    </PageHeaderContext.Provider>
  )
}

/* ---------- Breadcrumb (link singolo "torna a ..." o percorso multi-livello) ---------- */

export function Breadcrumb({
  className,
  render = <div />,
  children,
  ...props
}: React.ComponentProps<"div"> & { render?: Render }) {
  const { size } = React.useContext(PageHeaderContext)
  return useRender({
    render,
    props: {
      ...props,
      className: cn(
        "flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground",
        size === "default" ? "mb-4" : "mb-3.5",
        className
      ),
      children,
    },
  })
}

export function BreadcrumbItem({
  className,
  render = <a />,
  children,
  ...props
}: React.ComponentProps<"a"> & { render?: Render }) {
  return useRender({
    render,
    props: {
      ...props,
      className: cn(
        "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
        className
      ),
      children,
    },
  })
}

export function BreadcrumbSeparator({
  className,
  children = "/",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-muted-foreground/50", className)}
      {...props}
    >
      {children}
    </span>
  )
}

/* ---------- Meta (riga sopra il titolo: ID, badge di stato/priorità, tag) ---------- */

export function Meta({
  className,
  render = <div />,
  children,
  ...props
}: React.ComponentProps<"div"> & { render?: Render }) {
  return useRender({
    render,
    props: {
      ...props,
      className: cn("mb-2 flex flex-wrap items-center gap-2.5", className),
      children,
    },
  })
}

export function MetaText({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-sm font-bold text-muted-foreground/80", className)}
      {...props}
    >
      {children}
    </span>
  )
}

const badgeToneClasses = {
  neutral: "bg-secondary text-secondary-foreground",
  brand: "bg-accent text-accent-foreground", // --accent-soft / --accent-dark del design
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive-soft text-destructive",
  info: "bg-info-soft text-info",
  purple: "bg-purple-soft text-purple",
  pink: "bg-pink-soft text-pink",
  amber: "bg-amber-soft text-amber",
} as const

export type PageHeaderBadgeTone = keyof typeof badgeToneClasses

export function Badge({
  tone = "neutral",
  className,
  render = <span />,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: PageHeaderBadgeTone
  render?: Render
}) {
  return useRender({
    render,
    props: {
      ...props,
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs leading-relaxed font-semibold whitespace-nowrap",
        badgeToneClasses[tone],
        className
      ),
      children,
    },
  })
}

/* ---------- Bar (riga principale: Heading a sinistra, Actions a destra) ---------- */

export function Bar({
  className,
  render = <div />,
  children,
  ...props
}: React.ComponentProps<"div"> & { render?: Render }) {
  return useRender({
    render,
    props: {
      ...props,
      className: cn("flex items-start justify-between gap-5", className),
      children,
    },
  })
}

export function Heading({
  className,
  render = <div />,
  children,
  ...props
}: React.ComponentProps<"div"> & { render?: Render }) {
  return useRender({
    render,
    props: { ...props, className: cn("min-w-0", className), children },
  })
}

export function Title({
  className,
  render = <h1 />,
  children,
  ...props
}: React.ComponentProps<"h1"> & { render?: Render }) {
  const { size } = React.useContext(PageHeaderContext)
  return useRender({
    render,
    props: {
      ...props,
      className: cn(
        "font-display font-extrabold tracking-[.2px] text-foreground",
        size === "default"
          ? "text-[32px] leading-none"
          : "text-[27px] leading-[1.2]",
        className
      ),
      children,
    },
  })
}

export function Description({
  className,
  render = <p />,
  children,
  ...props
}: React.ComponentProps<"p"> & { render?: Render }) {
  const { size } = React.useContext(PageHeaderContext)
  return useRender({
    render,
    props: {
      ...props,
      className: cn(
        "text-muted-foreground",
        size === "default" ? "mt-0.5 text-[13.5px]" : "mt-[7px] text-[13px]",
        className
      ),
      children,
    },
  })
}

/* ---------- Actions (pulsanti, ricerca, select, sulla destra dell'header) ---------- */

export function Actions({
  className,
  render = <div />,
  children,
  ...props
}: React.ComponentProps<"div"> & { render?: Render }) {
  return useRender({
    render,
    props: {
      ...props,
      className: cn("flex flex-shrink-0 items-center gap-3", className),
      children,
    },
  })
}

/* -------------------------------------------------------------------------
 * Esempi d'uso — una variante per ogni header realmente presente nel design.
 * Componendo liberamente questi pezzi si ottiene qualunque combinazione
 * (con/senza breadcrumb, con/senza meta, con/senza actions, dimensione
 * default/detail) senza bisogno di un prop "variant" enumerato.
 *
 * import * as PageHeader from "@/components/ui/page-header"
 *
 * // 1) Header di pagina semplice (Dashboard, Impostazioni)
 * <PageHeader.Root>
 *   <PageHeader.Bar>
 *     <PageHeader.Heading>
 *       <PageHeader.Title>Dashboard</PageHeader.Title>
 *       <PageHeader.Description>
 *         Bentornato Marco — ecco la situazione dei ticket oggi
 *       </PageHeader.Description>
 *     </PageHeader.Heading>
 *     <PageHeader.Actions />
 *   </PageHeader.Bar>
 * </PageHeader.Root>
 *
 * // 2) Header di lista con ricerca + CTA (TicketList, Knowledge Base)
 * <PageHeader.Root>
 *   <PageHeader.Bar>
 *     <PageHeader.Heading>
 *       <PageHeader.Title>Ticket</PageHeader.Title>
 *       <PageHeader.Description>
 *         Progetto: Sito E-commerce · 6 ticket in questa vista
 *       </PageHeader.Description>
 *     </PageHeader.Heading>
 *     <PageHeader.Actions>
 *       <Input placeholder="Cerca per titolo o ID..." className="w-64" />
 *       <Button render={<Link to="/tickets/new" />}>
 *         <Plus className="size-4" /> Nuovo Ticket
 *       </Button>
 *     </PageHeader.Actions>
 *   </PageHeader.Bar>
 * </PageHeader.Root>
 *
 * // 3) Header di dettaglio con back link, badge di stato e azioni (TicketDetail)
 * <PageHeader.Root size="detail">
 *   <PageHeader.Breadcrumb>
 *     <PageHeader.BreadcrumbItem render={<Link to="/tickets" />}>
 *       <ArrowLeft className="size-3.5" /> Torna ai ticket
 *     </PageHeader.BreadcrumbItem>
 *   </PageHeader.Breadcrumb>
 *   <PageHeader.Bar>
 *     <PageHeader.Heading>
 *       <PageHeader.Meta>
 *         <PageHeader.MetaText>#1042</PageHeader.MetaText>
 *         <PageHeader.Badge tone="warning">In attesa cliente</PageHeader.Badge>
 *         <PageHeader.Badge tone="danger">Urgente</PageHeader.Badge>
 *         <PageHeader.Badge tone="brand">Pagamenti</PageHeader.Badge>
 *       </PageHeader.Meta>
 *       <PageHeader.Title>
 *         Il pagamento con carta fallisce al checkout
 *       </PageHeader.Title>
 *       <PageHeader.Description>
 *         Aperto da Giulia Rossi · Sito E-commerce · 22 set 2026, 09:12
 *       </PageHeader.Description>
 *     </PageHeader.Heading>
 *     <PageHeader.Actions>
 *       <Select defaultValue="in-attesa-cliente">...</Select>
 *       <Button>Assegna a me</Button>
 *     </PageHeader.Actions>
 *   </PageHeader.Bar>
 * </PageHeader.Root>
 *
 * // 4) Header di dettaglio con breadcrumb multi-livello (EditOrganization)
 * <PageHeader.Root size="detail">
 *   <PageHeader.Breadcrumb>
 *     <PageHeader.BreadcrumbItem render={<Link to="/admin/organizations" />}>
 *       <ArrowLeft className="size-3.5" /> Organizzazioni
 *     </PageHeader.BreadcrumbItem>
 *     <PageHeader.BreadcrumbSeparator />
 *     <PageHeader.BreadcrumbItem render={<span />}>Acme Corp</PageHeader.BreadcrumbItem>
 *   </PageHeader.Breadcrumb>
 *   <PageHeader.Bar>
 *     <PageHeader.Heading>
 *       <PageHeader.Title>Modifica organizzazione — Acme Corp</PageHeader.Title>
 *     </PageHeader.Heading>
 *     <PageHeader.Actions>
 *       <Button variant="secondary" render={<Link to="/admin/organizations" />}>
 *         Annulla
 *       </Button>
 *       <Button>Salva modifiche</Button>
 *     </PageHeader.Actions>
 *   </PageHeader.Bar>
 * </PageHeader.Root>
 * ---------------------------------------------------------------------- */
