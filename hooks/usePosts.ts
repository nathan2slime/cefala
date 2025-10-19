import { useEffect, useState, useCallback } from "react";

import { useSupabase } from "./useSupabase";

export type Post = {
  id: string;
  content: string;
  sentiment: string;
  title: string;
  created_at: string;
};

export const usePosts = () => {
  const { supabase } = useSupabase();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      console.log(user.id);
      
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPosts = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refreshPosts, refreshing };
};
