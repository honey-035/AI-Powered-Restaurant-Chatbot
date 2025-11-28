import React, { useState, useRef, useEffect } from 'react';
import { Send, Coffee, TrendingUp, Users, DollarSign, ShoppingCart, MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';

export default function TastyTrailCafe() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to TastyTrail Cafe AI! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          system: "You are a helpful AI assistant for TastyTrail Cafe. Help with menu recommendations, order assistance, cafe information, and customer service. Be friendly and professional."
        })
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Daily Orders', value: '342', icon: ShoppingCart, change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Revenue', value: '$8,420', icon: DollarSign, change: '+8%', color: 'from-green-500 to-emerald-500' },
    { label: 'Customers', value: '1,248', icon: Users, change: '+24%', color: 'from-purple-500 to-pink-500' },
    { label: 'Avg Rating', value: '4.8', icon: TrendingUp, change: '+0.3', color: 'from-orange-500 to-red-500' }
  ];

  const menuItems = [
    { name: 'Espresso', price: '$3.50', orders: 45, trend: 'up' },
    { name: 'Cappuccino', price: '$4.50', orders: 38, trend: 'up' },
    { name: 'Croissant', price: '$5.00', orders: 28, trend: 'down' },
    { name: 'Matcha Latte', price: '$5.50', orders: 32, trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl shadow-lg shadow-amber-500/50">
              <Coffee className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                TastyTrail Cafe
              </h1>
              <p className="text-sm text-gray-400">AI-Powered Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Menu Performance */}
      <div className="max-w-7xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-500" />
          Top Menu Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${item.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
              <div className="text-2xl font-bold text-amber-400 mb-1">{item.price}</div>
              <div className="text-sm text-gray-400">{item.orders} orders today</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Panel */}
      <div className={`fixed ${isChatMaximized ? 'inset-6' : 'bottom-6 right-6 w-96'} transition-all duration-300 z-50`}>
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="ml-auto flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-6 py-4 rounded-full shadow-2xl shadow-amber-500/50 transition-all hover:scale-105"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="font-semibold">AI Assistant</span>
          </button>
        ) : (
          <div className={`bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 flex flex-col ${isChatMaximized ? 'h-full' : 'h-[500px]'}`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-amber-500/10 to-orange-600/10">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsChatMaximized(!isChatMaximized)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {isChatMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-none' 
                      : 'bg-slate-700 text-white rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl transition-all hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}