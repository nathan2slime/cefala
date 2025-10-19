import { useSupabase } from "@/hooks/useSupabase";
import { Class } from "@/types/class";
import { useEffect, useState } from "react";

export const useClass = () => {
  const { supabase } = useSupabase();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Class[]>([]);

  const fetchClasses = async () => {
    const { data } = await supabase.from("class").select<"*", Class>("*");
    
    setData(data || []);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClasses();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchClasses();
  }, [])

  return { refreshing, setRefreshing, data, onRefresh };
};
