import { createContext, useReducer, useState } from "react";
import { globalReducer } from "./reducer/global";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    refresh: false,
    isBusy: false,
    isSocketConnected: false,
    notificationsCount: 0,
    unseenMessageCount: 0,
    activeChats: [],
  };
  const [isBusy, setIsBusy] = useState(false);
  const [useUi, uiDispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        isBusy,
        setIsBusy,
        useUi,
        uiDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
