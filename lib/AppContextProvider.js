import { combineComponents } from "@lib/combineComponents";
import { AuthContextProvider } from "./authContext";
import { GlobalContextProvider } from "./globalContext";
import { SocketContextProvider } from "./socketContext";

const providers = [
  AuthContextProvider,
  GlobalContextProvider,
  SocketContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
