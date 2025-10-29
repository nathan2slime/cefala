import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fragment } from "react";

import { RouteItem, TabBarProps } from "./model";
import {
  TabBarItemText,
  TabBarItem,
  TabBarItemIcon,
  TabBarStyled,
  TabBarActionIcon,
  TabBarAction,
} from "./styles";

export const TabBar = ({ state, navigation, allowedRoutes }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  const icons: Record<string, any> = {
    index: "home",
    schedule: "calendar",
    reports: "chart-bar",
    account: "account",
    service: "headset",
    classes: "school",
    diary: "file-document-edit",
  };

  const items: RouteItem = {
    home: {
      icon: {
        active: "home",
        normal: "home-outline",
      },
      label: "Home",
    },
    diary: {
      icon: {
        active: "medkit",
        normal: "medkit-outline",
      },
      label: "Diário",
    },
    classes: {
      icon: {
        active: "newspaper",
        normal: "newspaper-outline",
      },
      label: "Turmas",
    },
    reports: {
      icon: {
        active: "newspaper",
        normal: "newspaper-outline",
      },
      label: "Relatórios",
    },
    account: {
      icon: {
        active: "person",
        normal: "person-outline",
      },
      label: "Conta",
    },
  };

  return (
    <TabBarStyled insets={insets}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };

        const item = items[route.name];

        if (!item) return;

        const accessibilityState = isFocused ? { selected: true } : {};
        const isAction = index == 1;

        return (
          <Fragment key={index}>
            <TabBarItem
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={accessibilityState}
              onPress={onPress}
            >
              <TabBarItemIcon
                name={isFocused ? item.icon.active : item.icon.normal}
                size={24}
                active={isFocused}
              />

              <TabBarItemText active={isFocused}>{item.label}</TabBarItemText>
            </TabBarItem>
          </Fragment>
        );
      })}
    </TabBarStyled>
  );
};
