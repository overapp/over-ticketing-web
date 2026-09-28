import { redirect } from "@tanstack/react-router";
import type { User } from "@/features/auth/types";

export function authenticatedGuard({
  user,
}: {
  user: User | null;
}) {
  if (!user) {
    throw redirect({to: '/auth/login'});
  }
}

export function anonymousGuard({
  user,
}: {
  user: User | null;
}) {
  if (user) {
    throw redirect({to: '/'});
  }
}
