import { ASSETS } from "@/assets";
import { useTariffStore } from "@/store/tariffStore";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { File, Paperclip } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  file?: {
    name: string;
    type: string;
    size: number;
    url: string;
  };
}

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize welcome message when component mounts or language changes
  useEffect(() => {
    const welcomeText = t("chatbot.welcome");
    setMessages((prev) => {
      // If messages exist and first message is welcome message, update it
      if (prev.length > 0 && prev[0].id === "1" && prev[0].sender === "bot") {
        return [
          {
            id: "1",
            text: welcomeText,
            sender: "bot",
            timestamp: new Date(),
          },
          ...prev.slice(1),
        ];
      }
      // Otherwise, set initial welcome message
      return [
        {
          id: "1",
          text: welcomeText,
          sender: "bot",
          timestamp: new Date(),
        },
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedFile) return;

    const fileData = selectedFile
      ? {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          url: URL.createObjectURL(selectedFile),
        }
      : undefined;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue || (selectedFile ? selectedFile.name : ""),
      sender: "user",
      timestamp: new Date(),
      file: fileData,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t("chatbot.response"),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isImageFile = (type: string): boolean => {
    return type.startsWith("image/");
  };
  const { selectedTariff } = useTariffStore();

  const handleChatClick = () => {
    if (!isAuthenticated) {
      navigate(APP_ROUTES.LOGIN);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleChatClick}
        className={`fixed ${
          selectedTariff ? "md:bottom-36 bottom-20" : "bottom-6"
        }  right-4 sm:right-6 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-[#112D6C] text-white rounded-full hover:bg-[#0f2659] transition-all duration-300 flex items-center justify-center z-50 group shadow-[0px_0px_10px_0px_#4F7096]`}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <img
            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]"
            src={ASSETS.support}
            alt=""
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="text-white p-4 relative rounded-t-lg flex items-center justify-between border-b border-[#4F7096]">
            <img className="w-[144px]" src={ASSETS.logo} alt="" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSocialModalOpen(true)}
                className={`text-[#112D6C] hover:text-[#0f2659] px-1 py-3 rounded-[8px] transition-colors ${
                  isSocialModalOpen ? "bg-[#4F70961A]" : ""
                }`}
                aria-label="Open social networks"
              >
                <svg
                  width="20"
                  height="5"
                  viewBox="0 0 20 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#4F7096" />
                  <circle cx="10" cy="2.5" r="2.5" fill="#4F7096" />
                  <circle cx="17.5" cy="2.5" r="2.5" fill="#4F7096" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#112D6C] hover:text-[#0f2659] transition-colors"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {isSocialModalOpen && (
              <>
                {/* Overlay - tashqariga bosilganda yopiladi */}
                <div
                  className="fixed inset-0 z-[55]"
                  onClick={() => setIsSocialModalOpen(false)}
                />
                <div
                  className="bg-[#f0f2f3] rounded-[8px] absolute left-4 right-4 top-[80%] z-[60] p-4 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-sm font-medium mb-3 text-center text-black">
                    Письмо через другие сети
                  </h3>

                  {/* Social Networks Grid */}
                  <div className="flex justify-center gap-3">
                    {/* Telegram */}
                    <a
                      href="https://t.me/Jetsim_support_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-xl"
                    >
                      <img
                        src={ASSETS.telegram}
                        alt="Telegram"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[12px] font-medium text-gray-800">
                        Telegram
                      </span>
                    </a>
                    <a
                      href="https://wa.me/79339000003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-xl"
                    >
                      <img
                        src={ASSETS.whatsapp}
                        alt="WhatsApp"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[12px] font-medium text-gray-800">
                        Whatsup
                      </span>
                    </a>
                    <a
                      href="https://www.instagram.com/jetsim.ru?igsh=dWRnbXk1MjUzNWk5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-xl"
                    >
                      <img
                        src={ASSETS.inst}
                        alt="Instagram"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[12px] font-medium text-gray-800">
                        Instagram
                      </span>
                    </a>
                    <a
                      href="https://vk.com/id1090229648"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-xl"
                    >
                      <img
                        src={ASSETS.vk}
                        alt="VKontakte"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[12px] font-medium text-gray-800">
                        Max
                      </span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-[#112D6C] text-white"
                      : "bg-[#E1E5E8CC] text-gray-800 border border-gray-200"
                  }`}
                >
                  {message.file && (
                    <div className="mb-2">
                      {isImageFile(message.file.type) ? (
                        <img
                          src={message.file.url}
                          alt={message.file.name}
                          className="max-w-full max-h-48 rounded-lg object-contain"
                        />
                      ) : (
                        <div
                          className={`flex items-center gap-2 p-2 rounded ${
                            message.sender === "user"
                              ? "bg-white/20"
                              : "bg-gray-100"
                          }`}
                        >
                          <File
                            className={`w-5 h-5 ${
                              message.sender === "user"
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm truncate ${
                                message.sender === "user"
                                  ? "text-white"
                                  : "text-gray-800"
                              }`}
                            >
                              {message.file.name}
                            </p>
                            <p
                              className={`text-xs ${
                                message.sender === "user"
                                  ? "text-white/70"
                                  : "text-gray-600"
                              }`}
                            >
                              {formatFileSize(message.file.size)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {message.text && <p className="text-sm">{message.text}</p>}
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-4 py-[10px] bg-white rounded-b-lg">
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <File className="w-4 h-4 text-[#4F7096]" />
                <span className="flex-1 text-sm text-gray-700 truncate">
                  {selectedFile.name}
                </span>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 border border-[#112D6C] px-3 py-2 rounded-[10px]">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("chatbot.placeholder")}
                className="w-full outline-none text-[14px]"
              />
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:bg-gray-100 p-1 rounded transition-colors"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5 text-[#4F709680]" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && !selectedFile}
                  className="bg-[#112D6C] text-white w-[36px] h-[36px] shrink-0 flex items-center justify-center p-2 rounded-full hover:bg-[#0f2659] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <img src={ASSETS.send} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
