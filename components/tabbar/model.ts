import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { EdgeInsets } from "react-native-safe-area-context";

export type TabBarProps = BottomTabBarProps & {
      allowedRoutes: string[];
};

export type RouteItem = {
  [key: string]: {
    icon: {
      active: any;
      normal: any;
    };
    label: string;
  };
};

export type TabBarItemProps = {
  active: boolean;
};

export type TabBarStyledProps = {
  insets: EdgeInsets;
};
