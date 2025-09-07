import React, {
  createContext,
  useContext,
} from "react";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  setSession: () => {},
});


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
