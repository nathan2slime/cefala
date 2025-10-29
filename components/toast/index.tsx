import { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";
import { useAnimationState } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import {
  CloseStyled,
  HeaderStyled,
  IconStyled,
  ToastStyled,
  ToastTitle,
  WrapperStyled,
} from "@/components/toast/styles";

import { ToastOptions } from "./model";

const emitter = new EventEmitter();
export const toast = {
  open: ({ message, color }: ToastOptions) => {
    emitter.emit("show", { message, color });
  },
};

export const Toast = () => {
  const insets = useSafeAreaInsets();

  let timeout: number | null = null;

  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ToastOptions>({
    color: "default",
    message: "Hi",
  });
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      translateX: 300,
    },
    to: {
      translateX: 0,
      opacity: 1,
    },
  });

  useEffect(() => {
    timeout && clearTimeout(timeout);

    if (isOpen) {
      timeout = setTimeout(() => {
        animationState.transitionTo("from");

        setIsOpen(false);
      }, 3000);
    } else {
      animationState.transitionTo("from");
    }
  }, [isOpen]);

  useEffect(() => {
    animationState.transitionTo("from");
    emitter.removeAllListeners();
    if (timeout) {
      clearTimeout(timeout);
    }

    emitter.addListener("show", (args) => {
      setIsOpen(true);
      setConfig(args as ToastOptions);

      if (animationState.current === "from") {
        animationState.transitionTo("to");
      }
    });

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const icons = {
    success: <IconStyled {...config} name="checkmark-circle" />,
    warning: <IconStyled {...config} name="warning" />,
    danger: <IconStyled {...config} name="alert" />,
    default: <IconStyled {...config} name="alert" />,
  };

  return (
    <WrapperStyled insets={insets}>
      <ToastStyled
        {...config}
        transition={{ type: "spring" }}
        state={animationState}
      >
        <HeaderStyled {...config}>{icons[config.color]}</HeaderStyled>

        <ToastTitle>{config.message}</ToastTitle>

        <TouchableOpacity
          onPress={() => {
            setIsOpen(false);
            clearTimeout(timeout!);
          }}
        >
          <CloseStyled name="close" />
        </TouchableOpacity>
      </ToastStyled>
    </WrapperStyled>
  );
};
