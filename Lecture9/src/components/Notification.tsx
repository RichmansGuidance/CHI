import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { SOCKET_SERVER_URL } from "../utils/SOCKET_SERVER_URL";
import { NotificationI  } from '../Interfaces/NotificationI';

function Notification({ onNewPost }: { onNewPost: () => void }) {
  const [, setNotifications] = useState<NotificationI>({
    data: "",
    user: "",
    imageUrl: "",
  });

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const handleNewPost = ({ message, user, imageUrl }: { message: string; user: string; imageUrl: string }) => {
      setNotifications({ data: message, user, imageUrl });

      toast(`User  ${user} has created a new post with description: ${message}`, {
        icon: "📢",
        duration: 10000,
      });

      onNewPost();
    };

    socket.on("newPost", handleNewPost);

    return () => {
      socket.off("newPost", handleNewPost);
      socket.disconnect();
    };
  }, [onNewPost]);

  return <Toaster position="top-center" reverseOrder={false} />;
}

export default Notification;