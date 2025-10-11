import { useSupabase } from "./useSupabase";

export const useSignUp = () => {
  const { isLoaded, supabase } = useSupabase();

  const signUp = async ({
    email,
    password,
    name,
    isTeacher = false,
  }: {
    email: string;
    password: string;
    name: string;
    isTeacher: boolean;
  }) => {
    const { error } = await supabase.auth.signUp({
      options: {
        data: {
          name,
          role: isTeacher ? "teacher" : "student",
        },
      },
      email,
      password,
    });
    if (error) throw error;
  };

  return {
    isLoaded,
    signUp,
  };
};
