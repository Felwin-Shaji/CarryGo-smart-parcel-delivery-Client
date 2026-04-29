import { useEffect, useRef, useState } from "react";
import { socket } from "../../Services/socket";
import { useChat } from "../../Services/Chat/useChat";

interface Message {
  id?: string
  senderId: string;
  text: string;
  createdAt?: string;
}

interface Props {
  chatId: string;
  currentUserId: string;
  receiverId: string;
  receiverName: string;
  bookingId: string;
  onClose?: () => void;
}

const ChatBox = ({ chatId, currentUserId, receiverId, receiverName, bookingId, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, getMessages } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!chatId) return;

    const handler = (message: Message & { tempId?: string }) => {
      setMessages((prev) => {
        // 1. Replace temp message
        if (message.tempId) {
          const index = prev.findIndex((m) => m.id === message.tempId);

          if (index !== -1) {
            const updated = [...prev];
            updated[index] = message; // replace temp with real
            return updated;
          }
        }

        //  2. Prevent duplicates (receiver side)
        if (prev.some((m) => m.id === message.id)) return prev;

        //  3. Add new message
        return [...prev, message];
      });
    };

    // 1. listen first
    socket.on("receive_message", handler);

    const init = async () => {
      const oldMessages = await getMessages(chatId);
      if (oldMessages) setMessages(oldMessages);

      // 2. join once
      socket.emit("join_chat", chatId);
      // console.log("JOINED:", chatId);
    };

    init();

    return () => {
      socket.off("receive_message", handler);
    };
  }, [chatId]);


  // 3. auto scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    // console.log('ssssssssssssssssssssssssssssssssss')
    const text = input;
    setInput("");

    // Optimistic UI
    const tempId = Date.now().toString();

    const tempMessage = {
      id: tempId,
      senderId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);


    await sendMessage(
      currentUserId,
      receiverId,
      bookingId,
      chatId,
      input,
      tempId
    );

  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-gray-100 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="p-3 bg-white shadow flex justify-between items-center">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {receiverName.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{receiverName}</span>
          </div>

        </div>

        {onClose && (
          <button onClick={onClose}>✕</button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div className="flex flex-col max-w-xs">

                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow relative
                    ${isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>

                {/* Time */}
                <span
                  className={`text-[10px] mt-1 ${isMe ? "text-right text-gray-400" : "text-left text-gray-400"
                    }`}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : ""}
                </span>

              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white flex gap-2 items-center shadow-inner">
        <input
          type="text"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-full shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;