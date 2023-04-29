import React from "react";
import MessageCard from "./MessageCard";

export const Messages = ({ messages, users }) => {
  return (
    <>
      {messages.map((message, i) => (
        <MessageCard
          right={users[0].userId === message.senderId ? true : false}
          key={i}
          message={message}
          user={users.find((u) => message.senderId === u.userId)?.user}
        />
      ))}
    </>
  );
};
