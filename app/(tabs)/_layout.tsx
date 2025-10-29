import { useSupabase } from "@/hooks/useSupabase";
import { Session } from "@supabase/supabase-js";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import { BottomNavigation, Icon } from "react-native-paper";

const icons: Record<string, any> = {
  index: "home",
  schedule: "calendar",
  reports: "chart-bar",
  account: "account",
  service: "headset",
  classes: "school",
  diary: "file-document-edit",
};

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
      tabBar={({
        state: { routes, index },
        descriptors,
        navigation: { navigate },
      }) => {
        return (
          <BottomNavigation.Bar
            navigationState={{
              index,
              routes: routes.filter((route) =>
                allowedRoutes.includes(route.name)
              ),
            }}
            onTabPress={({ route }) => {
              const newIndex = routes.findIndex((r) => r.key === route.key);
              if (newIndex !== -1) {
                const route = routes[newIndex];

                navigate(route.name);
              }
            }}
            renderIcon={({ route, color }) => (
              <View style={{ alignItems: "center" }}>
                <Icon source={icons[route.name]} size={24} color={color} />
              </View>
            )}
            shifting
            getLabelText={({ route }) => {
              return descriptors[route.key].options.title;
            }}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
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
