import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

export const supabase = createClient(
  "https://eczedsktnfvnoixmrfec.supabase.co",
  String(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY),
  {
    auth: {
      lock: processLock,
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
