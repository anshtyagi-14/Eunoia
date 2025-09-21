import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';

function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);
    try {
      const response = await axios.post('/api/v1/aura/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <AnimatedPage>
      {/* This container uses CSS Grid to structure the layout perfectly */}
      <div className="h-full max-w-4xl mx-auto grid grid-rows-[auto_1fr_auto] gap-4 p-6 lg:p-10">
        
        {/* Header: First row, height is automatic */}
        <h2 className="text-2xl font-bold text-sky-900 border-b border-sky-200 pb-2">Let's navigate today, together.</h2>
        
        {/* Chat Window: Second row, takes up all available space */}
        <div className="overflow-y-auto custom-scrollbar bg-white rounded-xl shadow-lg border border-sky-100 p-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex my-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-lg p-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {isBotTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex my-3 justify-start">
                <div className="bg-slate-200 text-slate-500 p-3 rounded-2xl rounded-bl-none flex items-center space-x-2">
                    <span className="typing-dot"></span>
                    <span className="typing-dot animation-delay-200"></span>
                    <span className="typing-dot animation-delay-400"></span>
                </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area: Third row, height is automatic */}
        <div>
          <div className={`flex shadow-sm rounded-lg transition-transform duration-300 ease-in-out ${isInputFocused ? 'scale-[1.02] -skew-x-1' : ''}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Type your message..."
              className="flex-1 border-slate-300 bg-white text-slate-800 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={handleSend}
              className="bg-sky-500 text-white font-semibold px-6 rounded-r-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-sky-300 transition-colors"
              disabled={!input.trim() || isBotTyping}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Chat;