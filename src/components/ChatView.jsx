import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, WifiOff, ShieldCheck, Zap, Laptop, Lock, Check } from 'lucide-react';
import { streamChat } from '../services/ollama';
import { addChatMessage, useChatMessages } from '../db/hooks';

export default function ChatView({ selectedModel, ollamaConnected }) {
  const messages = useChatMessages('main-chat') || [];
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [useLocalDocs, setUseLocalDocs] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, isGenerating]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = input.trim();
    
    setInput('');
    
    // Save user message to IndexedDB
    await addChatMessage({
      conversationId: 'main-chat',
      sender: 'user',
      text: userText,
      time: formattedTime
    });

    if (!ollamaConnected) {
      await addChatMessage({
        conversationId: 'main-chat',
        sender: 'ai',
        text: 'Ollama is not running. Please install and start Ollama to use AI chat. Visit https://ollama.com to get started.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      return;
    }

    if (!selectedModel) {
      await addChatMessage({
        conversationId: 'main-chat',
        sender: 'ai',
        text: 'Please select a model first.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      return;
    }

    setIsGenerating(true);
    setStreamingText('');

    try {
      // Build conversation history format for streamChat
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      // Add the new user message
      history.push({ role: 'user', content: userText });

      let fullResponse = '';
      
      await streamChat(selectedModel, history, (chunk) => {
        fullResponse += chunk;
        setStreamingText(fullResponse);
      });

      // Once done, save to DB
      await addChatMessage({
        conversationId: 'main-chat',
        sender: 'ai',
        text: fullResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error) {
      console.error('Chat error:', error);
      await addChatMessage({
        conversationId: 'main-chat',
        sender: 'ai',
        text: 'An error occurred while communicating with the local AI model.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } finally {
      setIsGenerating(false);
      setStreamingText('');
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner matching Image 4 */}
      <div className="bg-[#070B15] border border-white/10 p-6 lg:p-8 rounded-2xl space-y-4 relative overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
            AI That Works. <span className="text-[#FF9F00]">Anywhere.</span>
          </h2>
          <p className="text-sm lg:text-base text-slate-300 font-medium">
            No Internet. No Limits. Just Powerful AI on Your Laptop.
          </p>
        </div>

        {/* 4 Feature Cards matching Image 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#0C1222] border border-white/10 p-3.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
            <WifiOff className="w-5 h-5 text-[#FF9F00]" />
            <span className="text-xs font-bold text-white uppercase">100% Offline</span>
            <span className="text-[10px] text-slate-400">No internet required</span>
          </div>

          <div className="bg-[#0C1222] border border-white/10 p-3.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#FF9F00]" />
            <span className="text-xs font-bold text-white uppercase">Private & Secure</span>
            <span className="text-[10px] text-slate-400">Your data stays on your device</span>
          </div>

          <div className="bg-[#0C1222] border border-white/10 p-3.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
            <Zap className="w-5 h-5 text-[#FF9F00]" />
            <span className="text-xs font-bold text-white uppercase">Fast & Efficient</span>
            <span className="text-[10px] text-slate-400">Built for 8GB laptops</span>
          </div>

          <div className="bg-[#0C1222] border border-white/10 p-3.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
            <Sparkles className="w-5 h-5 text-[#FF9F00]" />
            <span className="text-xs font-bold text-white uppercase">Smart & Powerful</span>
            <span className="text-[10px] text-slate-400">Local LLM + RAG Technology</span>
          </div>
        </div>

        {/* African Target Banner matching Image 4 */}
        <div className="bg-[#0C1222] border border-amber-500/30 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-bold text-white">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#FF9F00]" />
            <span>Built for African Businesses, Creators & Innovators</span>
          </div>
        </div>
      </div>

      {/* App Interface Layout matching Image 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#090E1B] border border-white/10 p-6 rounded-2xl">
        {/* Main Conversation Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-[#070B15] border border-white/10 rounded-xl p-5 flex flex-col justify-between min-h-[480px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF9F00]" />
              <h3 className="font-bold text-white font-['Outfit'] text-sm">AI Assistant</h3>
            </div>
            
            <div className="flex items-center gap-2 bg-[#0C1222] border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer" onClick={() => setUseLocalDocs(!useLocalDocs)}>
              <span className="text-[10px] font-bold text-slate-300">Context: Include Local Documents</span>
              <button 
                type="button"
                className={`w-8 h-4 rounded-full relative transition-colors ${useLocalDocs ? 'bg-amber-500' : 'bg-slate-700'}`}
              >
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${useLocalDocs ? 'left-4.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          <div className="py-4 space-y-4 flex-1 overflow-y-auto max-h-[360px]">
            {useLocalDocs && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-center mx-auto w-3/4 mb-4">
                <span className="text-[10px] text-amber-400 font-bold flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> AI is now securely reading from your local Document Vault (RAG Active)
                </span>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#162345] text-white rounded-br-none'
                      : 'bg-[#101A33] text-slate-200 rounded-bl-none border border-white/5'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-[10px] text-slate-400 text-right block mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {isGenerating && streamingText && (
              <div className="flex gap-3 justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed bg-[#101A33] text-slate-200 rounded-bl-none border border-white/5">
                  <p className="whitespace-pre-wrap">{streamingText}</p>
                  <span className="text-[10px] text-slate-400 text-right block mt-1">Generating...</span>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-amber-400 italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Casjoe local model generating...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="relative mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-[#090E1B] border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500"
            />
            <button 
              type="submit" 
              disabled={isGenerating || !input.trim()}
              className="absolute right-2 top-1.5 w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9F00] to-[#FF6B00] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Status Panel (4 cols) matching Image 4 */}
        <div className="lg:col-span-4 space-y-4">
          {/* Model Status */}
          <div className="bg-[#070B15] border border-white/10 p-4 rounded-xl space-y-2">
            <span className="text-xs text-slate-400 block font-medium">Model Status</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selectedModel ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                {selectedModel ? selectedModel : 'No Model Selected'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${selectedModel ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-500/10'}`}>
                {selectedModel ? 'Active' : 'Idle'}
              </span>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-[#070B15] border border-white/10 p-4 rounded-xl space-y-2">
            <span className="text-xs text-slate-400 block font-medium">System</span>
            <div className={`flex items-center gap-2 text-xs font-bold ${ollamaConnected ? 'text-emerald-400' : 'text-amber-500'}`}>
              <span className={`w-2 h-2 rounded-full ${ollamaConnected ? 'bg-emerald-400' : 'bg-amber-500'}`} />
              <span>{ollamaConnected ? 'AI Connected' : 'Ollama Not Running'}</span>
            </div>
          </div>

          {/* RAM Usage */}
          <div className="bg-[#070B15] border border-white/10 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">RAM Usage</span>
              <span className="text-white font-bold">4.1 GB / 8 GB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '51%' }} />
            </div>
          </div>

          {/* CPU Usage */}
          <div className="bg-[#070B15] border border-white/10 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">CPU Usage</span>
              <span className="text-emerald-400 font-bold">32%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '32%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 4 */}
      <div className="bg-[#0C1222] border border-amber-500/30 p-4 rounded-xl text-center">
        <span className="text-xs font-extrabold text-[#FF9F00] uppercase tracking-widest">
          AI POWERED. PRIVACY FIRST. AFRICA READY.
        </span>
      </div>
    </div>
  );
}
