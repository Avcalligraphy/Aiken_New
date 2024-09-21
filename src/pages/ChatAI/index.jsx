import React, { useState, useEffect } from "react";
import Layout from "../../Layouts";

const ChatAI = ({ active = true }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [typingContent, setTypingContent] = useState(""); // Track typing text

  console.log(typingContent)

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      sender: "user",
      content: inputValue,
    };

    // Update messages to include user's message
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsAnalyzing(true);

    // Call AI API
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBSVz7Wl1EZ39vl0oZ4XBc88a3A81_l3h4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: inputValue }] }],
          }),
        }
      );

      const result = await response.json();
      const aiMessageText = result.candidates[0].content.parts[0].text;

      // Start typing effect
      typeText(aiMessageText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to type text one character at a time
  const typeText = (text) => {
    setTypingContent(""); // Reset typing content
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypingContent((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        const aiMessage = {
          sender: "ai",
          content: text,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setTypingContent(""); // Clear typing content after message is fully typed
      }
    }, 50); // Adjust typing speed by changing the interval duration
  };

  return (
    <Layout title="Bagaimana keadaanmu hari ini?">
      <div
        className="px-[15px] pb-[150px]"
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <div className="flex flex-col justify-between">
          {/* Chat content section */}
          <div className="flex flex-col p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                {message.sender === "user" ? (
                  <div className="flex items-center space-x-2">
                    <i className="bx bxs-user-circle text-[32px] text-gray-300"></i>
                    <div className="text-gray-700 text-sm">You</div>
                    <div className="ml-4 bg-gray-100 p-2 rounded-lg shadow text-sm text-gray-800">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg shadow text-sm text-gray-800">
                      {message.content}
                    </div>
                    <img
                      src="/icons/logo.png"
                      alt="logo"
                      className="w-auto h-[35px] ml-4"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Show typing effect */}
            {typingContent && (
              <div className="flex justify-end items-center">
                <div className="bg-purple-100 p-2 rounded-lg shadow text-sm text-gray-800">
                  {typingContent}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-gray-500 text-sm text-center">
                Analyzing...
              </div>
            )}
          </div>

          {/* Input form at the bottom */}
          <div className="w-full p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#7A54B7] flex justify-center items-center">
                <i className="bx bx-message-rounded text-white text-xl"></i>
              </div>
              <input
                type="text"
                className="flex-1 ml-4 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-purple-500"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAI;
