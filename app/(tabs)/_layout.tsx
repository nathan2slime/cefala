import { TabBar } from "@/components/tabbar";
import { useSupabase } from "@/hooks/useSupabase";
import { Session } from "@supabase/supabase-js";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import { BottomNavigation, Icon } from "react-native-paper";


const titles: Record<string, string> = {
  index: "Home",
  diary: "Diário",
  classes: "Turmas",
  service: "Atendimento",
  reports: "Relatórios",
  schedule: "Agenda",
  account: "Conta",
};

const getAllowedRoutes = (session: Session | null | undefined) => {
  if (session) {
    const user = session.user.user_metadata;

    return user.role === "student"
      ? ["index", "diary", "service", "account"]
      : ["schedule", "reports", "account", "classes"];
  }

  return [];
};

export default function TabLayout() {
  const { session } = useSupabase();
  const allowedRoutes = getAllowedRoutes(session);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, ...props }) => (
        <TabBar
          {...props}
          allowedRoutes={allowedRoutes}
          state={{
            ...state,
            routes: state.routes.filter((route) =>
              allowedRoutes.includes(route.name)
            ),
          }}
        />
      )}
    >
      {Object.keys(titles)
        .filter((route) => allowedRoutes.includes(route))
        .map((route, index) => (
          <Tabs.Screen
            key={route + index.toString()}
            name={route}
            options={{
              title: titles[route],
            }}
          />
        ))}
    </Tabs>
  );
}
