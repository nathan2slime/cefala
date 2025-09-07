import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import { Snackbar } from "react-native-paper";

type SnackbarContextType = {
  showSnackbar: (
    message: string,
    actionLabel?: string,
    actionCallback?: () => void
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [actionLabel, setActionLabel] = useState<string | undefined>(undefined);
  const [actionCallback, setActionCallback] = useState<
    (() => void) | undefined
  >(undefined);

  const showSnackbar = useCallback(
    (msg: string, label?: string, callback?: () => void) => {
      setMessage(msg);
      setActionLabel(label);
      setActionCallback(() => callback);
      setVisible(true);
    },
    []
  );

  const onDismiss = () => setVisible(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        
        action={
          actionLabel
            ? {
                label: actionLabel.toUpperCase(),
                onPress: () => {
                  if (actionCallback) actionCallback();
                  setVisible(false);
                },
              }
            : undefined
        }
      >
        {message.toUpperCase()}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
