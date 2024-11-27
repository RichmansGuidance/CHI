import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { NotificationNewPostI } from "../Interfaces/NewPostNotificationI";
import { SOCKET_SERVER_URL } from "../utils/SOCKET_URL";

export const useSocket = () => {
  const [newPostData, setNewPostData] = useState<NotificationNewPostI | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1500,
      reconnectionDelayMax: 6000,
    });

    setSocket(socketInstance);

    const handleNewPost = (data: NotificationNewPostI) => {
      setNewPostData(data);
    };

    socketInstance.on("newPost", handleNewPost);

    return () => {
      socketInstance.off("newPost", handleNewPost); 
      socketInstance.disconnect(); 
    };
  }, []);

  return { newPostData, socket };
};
