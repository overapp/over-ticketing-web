import { useAuth } from "./use-auth";

export function useCurrentUser() {
  return useAuth().currentUser;
}