import { getRouter } from '@/router';
import { client } from '@/lib/api';
import { queryClient } from '@/lib/query-client';

export const login = async (email: string, password: string) => {
  await client.post('/auth/login', { email, password })
  queryClient.invalidateQueries({ queryKey: ['auth-me'] })
  getRouter().navigate({ to: "/" })
}

export const logout = async () => {
  await client.post('/auth/logout').catch(() => {})
  getRouter().navigate({ to: "/auth/login" })
}