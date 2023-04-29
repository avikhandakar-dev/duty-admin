import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import AuthContext from "./authContext";
import { GlobalContext } from "./globalContext";

export const SocketContext = createContext(undefined);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const { useUi, uiDispatch } = useContext(GlobalContext);

  const join = () => {
    if (!useUi.isSocketConnected) {
      socket?.emit("join", user?.id);
      uiDispatch({
        type: "CONNECT_TO_SOCKET",
        payload: {
          value: true,
        },
      });
    }
  };

  useEffect(() => {
    if (socket === null) {
      setSocket(
        io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
          reconnection: true,
          reconnectionDelay: 3000,
          reconnectionAttempts: 1000,
        })
      );
    }
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    const connect = () => {
      if (!user || !socket) {
        return;
      }
      join();
      socket.on("connect", () => {
        join();
      });
    };
    connect();
  }, [user, socket]);

  useEffect(() => {
    const disconnect = () => {
      if (!socket) {
        return;
      }
      socket.on("disconnect", () => {
        uiDispatch({
          type: "CONNECT_TO_SOCKET",
          payload: {
            value: false,
          },
        });
      });
    };
    disconnect();
  }, [socket]);

  useEffect(() => {
    const getOnlineUsers = () => {
      if (!socket) return;
      socket?.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    };
    getOnlineUsers();
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
