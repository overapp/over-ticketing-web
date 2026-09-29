import { createContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { client } from "@/lib/api";
// import { GlobalLoader } from "@/components/loaders/global-loader";

export type CurrentUser = {
  id: string;
  email: string;
  roles: string[];
};

type AuthContextValue = {
  currentUser: CurrentUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading, isFetched } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<CurrentUser | null> => {
      try {
        const { data } = await client.get<CurrentUser>("/auth/me");
        return data;
      } catch (error) {
        // 401 = nessuna sessione valida: non è un errore applicativo, è lo stato "non loggato"
        if (isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minuti: evita di richiamare /auth/me troppo spesso
  });

  // isFetched garantisce che aspettiamo la PRIMA risposta prima di considerare l'utente "non loggato"
  const loading = isLoading || !isFetched;

  const signIn = async (email: string, password: string) => {
    await client.post("/auth/login", { email, password }); // il backend risponde con Set-Cookie
    await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  };

  const signOut = async () => {
    await client.post("/auth/logout"); // il backend invalida/cancella il cookie
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.clear(); // svuota anche la cache delle query "protette" (liste utenti, asset, ecc.)
  };

  if (loading) {
    // return <GlobalLoader />;
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser: currentUser ?? null, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}