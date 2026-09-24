import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AppLogo } from "@/components/logo"

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="relative flex min-h-svh items-center justify-center bg-sidebar p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 42%)",
        }}
      />

      <div className="relative w-full max-w-105 rounded-2xl border border-border bg-card px-9 pt-10 pb-[34px] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <AppLogo className="mb-7" />
        <Outlet />
      </div>
    </div>
  )
}
