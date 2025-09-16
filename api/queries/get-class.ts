import { useSnackbar } from "@/providers/snackbar";
import { supabase } from "@/supabase.config";
import { useQuery } from "@tanstack/react-query";

export function useClassQuery() {
  const { showSnackbar } = useSnackbar();

  return useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const { data, error } = await supabase.from("class").select("*");
      if (error) {
        showSnackbar("Erro ao buscar as salas", "Fechar");
        throw error;
      }
      return data;
    },
  });
}