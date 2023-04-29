export const globalReducer = (state, action) => {
  switch (action.type) {
    case "DO_REFRESH": {
      return {
        ...state,
        refresh: !state.refresh,
      };
    }
    case "CONNECT_TO_SOCKET": {
      return {
        ...state,
        isSocketConnected: action.payload.value,
      };
    }
    case "SET_ACTIVE_CHATS": {
      return {
        ...state,
        activeChats: action.payload.value,
      };
    }
    case "SET_MESSAGES_COUNT": {
      return {
        ...state,
        unseenMessageCount: action.payload.count,
      };
    }
    default:
      return state;
  }
};
