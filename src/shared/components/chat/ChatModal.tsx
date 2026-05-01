import ChatBox from "./ChatBox";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  currentUserId: string;
  receiverId: string;
  receiverName: string;
  bookingId: string;
}

const ChatModal = ({ isOpen, onClose, chatId, currentUserId, receiverName, receiverId, bookingId }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end items-end z-50">

      {/* Chat container */}
      <div className="w-full max-w-md m-4">
        <ChatBox
          chatId={chatId}
          currentUserId={currentUserId}
          receiverId={receiverId}
          receiverName={receiverName}
          bookingId={bookingId}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ChatModal;