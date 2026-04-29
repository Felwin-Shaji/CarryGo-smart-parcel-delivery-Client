import { useAxios } from "../../hooks/useAxios";
import { API_CHAT } from "../../constants_Types/apiRoutes";
import toast from "react-hot-toast";

export const useChat = () => {
    const axiosInstance = useAxios();

    const getOrCreateChatId = async (userIds: [string, string], bookingId: string) => {
        //  Get or create chat
        try {
            const res = await axiosInstance.post(API_CHAT.GET_OR_CREATE_CHAT, {
                userIds,
                bookingId
            });
            return res.data.data as string;


        } catch (error) {
            console.error(error);
            toast.error("Chat initialization failed");
            return null;
        }
    };

    //  Get messages (next step for you)
    const getMessages = async (chatId: string) => {
        try {
            const res = await axiosInstance.get(`${API_CHAT.MESSAGES}/${chatId}`);

            if (res.data.success) {
                return res.data.data;
            }

            toast.error(res.data.message || "Failed to fetch messages");
            return [];

        } catch (error) {
            console.error(error);
            toast.error("Message fetch failed");
            return [];
        }
    };

    const sendMessage = async (senderId: string, receiverId: string, bookingId: string, chatId: string, text: string, tempId: string) => {
        try {
            const res = await axiosInstance.post(API_CHAT.MESSAGES, {
                senderId,
                receiverId,
                bookingId,
                chatId,
                text,
                tempId
            });

            return res.data.data.text;

        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        getOrCreateChatId,
        getMessages,
        sendMessage
    };
};