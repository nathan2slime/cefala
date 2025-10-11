import { useMemo, useEffect, PropsWithChildren } from "react";
import { AppState } from "react-native";

import { createClient, processLock } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SupabaseContext } from "@/contexts/supabase";

export const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const supabaseUrl = "https://eczedsktnfvnoixmrfec.supabase.co";
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = useMemo(
    () =>
      createClient(supabaseUrl, supabaseKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          lock: processLock,
          debug: true,
        },
        db: {
          schema: "public",
        }
      }),
    [supabaseUrl, supabaseKey],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    return () => {
      subscription?.remove();
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};