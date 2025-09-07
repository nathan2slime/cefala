import { Tabs } from "expo-router";
import React from "react";

import { BottomNavigation, Icon } from "react-native-paper";

const icons: Record<string, any> = {
  index: "home",
  schedule: "calendar",
  reports: "chart-bar",
  account: "account",
  classes: "school",
};

const titles: Record<string, string> = {
  index: "Home",
  classes: "Turmas",
  reports: "Relatórios",
  schedule: "Agenda",
  account: "Conta",
};

export default function TabLayout() {
  const allowedRoutes = ["schedule", "reports", "account", "classes"];

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
              <Icon source={icons[route.name]} size={24} color={color} />
            )}
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
        .map((route) => (
          <Tabs.Screen
            key={route}
            name={route}
            options={{
              title: titles[route],
            }}
          />
        ))}
    </Tabs>
  );
}
