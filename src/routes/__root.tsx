import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
// import { TanStackDevtools } from "@tanstack/react-devtools"
import { queryOptions, QueryClientProvider } from "@tanstack/react-query"

import appCss from "../styles.css?url"
import { client as apiClient } from '@/lib/api';
import { queryClient } from "@/lib/query-client"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { User } from "@/features/auth/types";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "OverTicketing",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async () => {
    const user = await queryClient.query(
      queryOptions({
        queryKey: ["auth-me"],
        queryFn: async () => {
          const { data } = await apiClient.get<User>("/auth/me")
          return data
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
      })
    ).catch(() => null)

    return {
      user,
    }
  },
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
        {/* <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
