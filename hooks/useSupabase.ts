import { useContext, useEffect, useState } from "react";

import { SupabaseClient, Session } from "@supabase/supabase-js";

import { SupabaseContext } from "@/contexts/supabase";

type UseSupabaseProps = {
  isLoaded: boolean;
  session: Session | null | undefined;
  supabase: SupabaseClient;
  signOut: () => Promise<void>;
  updateUserName: (newName: string) => Promise<void>
};

export const useSupabase = (): UseSupabaseProps => {
  const supabase = useContext(SupabaseContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .finally(() => {
        setIsLoaded(true);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!supabase) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  const updateUserName = async (newName: string) => {
    if (!supabase) return
    const { error } = await supabase.auth.updateUser({
      data: { name: newName },
    });
  }

  return { isLoaded, session, supabase, signOut, updateUserName };
};
