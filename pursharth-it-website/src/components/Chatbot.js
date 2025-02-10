import React, { useState } from "react";
import { X } from "lucide-react"; 

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");

 
  function getBotResponse(message) {
    let response;
    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      response = "Hello! How can I assist you today?";
    } else if (message.includes("services")) {
      response = "We offer web development, mobile app development, AI solutions, and more!";
    } else if (message.includes("contact")) {
      response = "You can reach us at pursharth.chaudhary2257@gmail.com or call +111-222-3333.";
    } else {
      response = "I'm not sure, but our team would be happy to assist you!";
    }

    return response;
  }


  const sendMessage = () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput };
    const botResponse = { sender: "bot", text: getBotResponse(userInput) };

    setMessages([...messages, userMessage, botResponse]);
    setUserInput(""); 
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
      >
        {isOpen ? "Close Chat" : "Chat with Us"}
      </button>

 
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          
          <div className="flex items-center justify-between bg-teal-500 text-white p-3">
            <h3 className="font-semibold">Chatbot</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X size={20} />
            </button>
          </div>

       
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 rounded-lg w-fit max-w-3/4 ${msg.sender === "user" ? "ml-auto bg-teal-500 text-white" : "bg-gray-200 text-gray-900"}`}>
                {msg.text}
              </div>
            ))}
          </div>

         
          <div className="p-3 border-t dark:border-gray-700 flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
