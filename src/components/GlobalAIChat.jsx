import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { agentChat } from '../services/ollama';
import db from '../db/database';

export default function GlobalAIChat({ selectedModel, ollamaConnected }) {
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null); // { text: string, type: 'success' | 'error' }

  const tools = [
    {
      type: "function",
      function: {
        name: "create_invoice",
        description: "Create an invoice for a customer.",
        parameters: {
          type: "object",
          properties: {
            customer: { type: "string", description: "Name of the customer" },
            amount: { type: "number", description: "Total amount in numbers, e.g. 50000" },
            items: { type: "string", description: "Description of the items" }
          },
          required: ["customer", "amount", "items"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "add_customer",
        description: "Add a new customer to the CRM.",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the customer" },
            company: { type: "string", description: "Company name" },
            location: { type: "string", description: "City or Country" },
            phone: { type: "string", description: "Phone number" }
          },
          required: ["name", "company"]
        }
      }
    }
  ];

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!command.trim() || !ollamaConnected || !selectedModel) return;

    setIsProcessing(true);
    setFeedback(null);
    const userPrompt = command;
    setCommand('');

    try {
      const messages = [
        { 
          role: 'system', 
          content: 'You are an agentic AI assistant. If the user asks to add a customer or create an invoice, you MUST use the provided tools. Extract the required parameters from the user prompt.' 
        },
        { role: 'user', content: userPrompt }
      ];

      const response = await agentChat(selectedModel, messages, tools);

      if (response.tool_calls && response.tool_calls.length > 0) {
        for (const tool of response.tool_calls) {
          const fn = tool.function;
          const args = typeof fn.arguments === 'string' ? JSON.parse(fn.arguments) : fn.arguments;

          if (fn.name === 'add_customer') {
            await db.customers.add({
              name: args.name || 'Unknown',
              company: args.company || 'Unknown',
              location: args.location || 'N/A',
              phone: args.phone || 'N/A',
              totalSpent: '₦0',
              status: 'Active',
              createdAt: new Date().toISOString()
            });
            setFeedback({ text: `Customer ${args.name} added successfully!`, type: 'success' });
          } 
          else if (fn.name === 'create_invoice') {
            const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            const generatedId = `INV-${new Date().getFullYear()}-${randomNum}`;
            
            await db.invoices.add({
              invoiceId: generatedId,
              customer: args.customer || 'Unknown Customer',
              amount: `₦${new Intl.NumberFormat('en-US').format(args.amount || 0)}`,
              currency: 'NGN',
              date: new Date().toISOString().split('T')[0],
              status: 'Pending',
              items: args.items || 'General Services',
              createdAt: new Date().toISOString()
            });
            setFeedback({ text: `Invoice ${generatedId} created for ${args.customer}!`, type: 'success' });
          }
        }
      } else {
        // Model replied with plain text (didn't use a tool)
        setFeedback({ text: response.content || "I didn't understand the command. Try 'Add customer John Doe from Acme Corp'", type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ text: 'AI processing failed.', type: 'error' });
    }

    setIsProcessing(false);
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <div className="flex-1 max-w-2xl mx-4 relative hidden lg:block">
      <form onSubmit={handleCommand} className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-md transition-opacity duration-300 ${isProcessing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        
        <div className="relative flex items-center bg-[#111A30] border-2 border-[#FF9F00]/30 rounded-xl overflow-hidden focus-within:border-[#FF9F00] focus-within:shadow-[0_0_15px_rgba(255,159,0,0.3)] transition-all">
          <div className="pl-4 pr-2 py-2 flex items-center justify-center bg-[#FF9F00]/10 border-r border-[#FF9F00]/20">
            {isProcessing ? (
              <Loader2 className="w-5 h-5 text-[#FF9F00] animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#FF9F00]" />
            )}
          </div>
          
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={!ollamaConnected || isProcessing}
            placeholder="Agent Command: 'Create an invoice for Sarah for 50000' or 'Add customer Google'"
            className="w-full bg-transparent border-none py-3 px-4 text-sm text-white placeholder-amber-500/40 focus:outline-none focus:ring-0 font-medium tracking-wide"
          />
          
          <button 
            type="submit"
            disabled={!command.trim() || !ollamaConnected || isProcessing}
            className="px-4 py-2 mr-2 bg-[#FF9F00] text-black font-bold text-xs rounded-lg hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Execute
          </button>
        </div>
      </form>

      {/* Floating Feedback Toast */}
      {feedback && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in-up">
          <div className={`p-3 rounded-lg border flex items-center gap-3 text-sm font-bold shadow-xl ${
            feedback.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-400' 
              : 'bg-red-950/90 border-red-500/50 text-red-400'
          }`}>
            <Sparkles className="w-4 h-4" />
            {feedback.text}
          </div>
        </div>
      )}
    </div>
  );
}
