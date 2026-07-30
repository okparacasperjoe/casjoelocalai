import React, { useState, useRef, useEffect } from 'react';
import {
  Cpu, HardDrive, Zap, Clock, MessageSquare, FileSearch,
  BarChart3, Play, Pause, RotateCcw, Volume2, WifiOff,
  Shield, Laptop, Film, Mic, Bolt, Microchip, ChevronRight,
  Star, Send, Search, Users, ShoppingCart, TrendingUp, Sparkles,
  Brain, FileText, Database, Settings, Gauge, Copy, Check
} from 'lucide-react';

// ─── Scene data for the 2-minute demo ────────────────────────────────────────
const SCENES = [
  {
    id: 1,
    timeRange: '0–15s',
    endSecond: 15,
    title: 'Introduction & Founder Statement',
    plainScript: 'Hello, my name is Casper Joe Okpara, Founder of Casjoetech Ltd. This is Casjoe Local AI, an offline AI assistant built to help African businesses access powerful AI on affordable laptops without relying on cloud services or an internet connection.',
    scriptHtml: '"Hello, my name is <strong>Casper Joe Okpara</strong>, Founder of <strong>Casjoetech Ltd</strong>. This is <strong>Casjoe Local AI</strong>, an offline AI assistant built to help African businesses access powerful AI on affordable laptops without relying on cloud services or an internet connection."',
    color: '#FFA600',
    bgColor: 'rgba(255,166,0,0.08)',
    icon: <Mic size={20} />
  },
  {
    id: 2,
    timeRange: '15–35s',
    endSecond: 35,
    title: 'The Problem: Unreliable Internet & High API Costs',
    plainScript: 'Millions of businesses across Africa cannot consistently use modern AI because of unreliable internet, expensive API costs, and limited hardware. We wanted to make AI accessible on the laptops people already own.',
    scriptHtml: '"Millions of businesses across Africa cannot consistently use modern AI because of <strong>unreliable internet</strong>, <strong>expensive API costs</strong>, and limited hardware. We wanted to make AI accessible on the laptops people already own."',
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.08)',
    icon: <WifiOff size={20} />
  },
  {
    id: 3,
    timeRange: '35–75s',
    endSecond: 75,
    title: 'Product Demonstration & RAG Document Search',
    plainScript: 'Everything you see is running locally. Starting the application, typing a business prompt, generating a proposal or quotation, and searching local documents with RAG. No cloud API, no internet connection, and no external servers.',
    scriptHtml: '"Everything you see is running locally. Starting the application, typing a business prompt, generating a proposal or quotation, and searching local documents with <strong>RAG</strong>. No cloud API, no internet connection, and no external servers."',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    icon: <FileSearch size={20} />
  },
  {
    id: 4,
    timeRange: '75–105s',
    endSecond: 105,
    title: 'Technical Highlights & Memory Telemetry',
    plainScript: 'Technical Highlights: Optimized open-source LLM, GGUF 4-bit quantized model, local C++ inference runtime, memory optimization running on an 8 GB laptop, with a 100% privacy-first design.',
    scriptHtml: '"Technical Highlights: <strong>Optimized open-source LLM</strong>, GGUF 4-bit quantized model, local C++ inference runtime, memory optimization running on an <strong>8 GB laptop</strong>, with a 100% privacy-first design."',
    color: '#a855f7',
    bgColor: 'rgba(168,85,247,0.08)',
    icon: <Cpu size={20} />
  },
  {
    id: 5,
    timeRange: '105–120s',
    endSecond: 120,
    title: 'Democratizing AI for Africa',
    plainScript: 'Our vision is to democratize AI for Africa by enabling businesses, students, and organizations to run powerful AI entirely offline. Thank you.',
    scriptHtml: '"Our vision is to <strong>democratize AI for Africa</strong> by enabling businesses, students, and organizations to run powerful AI entirely offline. Thank you."',
    color: '#38bdf8',
    bgColor: 'rgba(56,189,248,0.08)',
    icon: <Star size={20} />
  }
];

// ─── Video generation prompts ─────────────────────────────────────────────────
const VIDEO_PROMPTS = [
  {
    platform: 'Google Veo 3',
    icon: '🎬',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.1)',
    border: 'rgba(66,133,244,0.3)',
    prompt: 'Cinematic photorealistic 4k shot of Casper Joe Okpara presenting Casjoe Local AI offline software on an 8GB laptop inside a modern office in Port Harcourt, Nigeria. Tech UI showing local RAM usage 3.8GB, Wi-Fi disconnected icon, smooth camera pan, 24fps, professional tech demo lighting.'
  },
  {
    platform: 'Runway Gen-4',
    icon: '🎞️',
    color: '#FF3366',
    bg: 'rgba(255,51,102,0.1)',
    border: 'rgba(255,51,102,0.3)',
    prompt: 'Medium close-up shot of an African business owner working on a laptop with no internet connection. UI shows Casjoe Local AI generating a business proposal offline with local RAG file search, zero cloud network traffic, studio lighting, hyper-realistic 8k details.'
  },
  {
    platform: 'Pika',
    icon: '⚡',
    color: '#FFA600',
    bg: 'rgba(255,166,0,0.1)',
    border: 'rgba(255,166,0,0.3)',
    prompt: 'Futuristic HUD screen displaying GGUF 4-bit quantized local LLM execution, 8GB memory allocation graph, offline Wi-Fi badge glowing golden #FFA600, dark navy background #000066, high-tech telemetry motion graphics -ar 16:9 -camera zoom in.'
  },
  {
    platform: 'Kling AI',
    icon: '🌍',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    prompt: 'Inspiring closing visual of a golden glowing map of Africa with connected neural network nodes, text reading "Democratizing Offline AI for Africa - Casjoetech Ltd", dark blue glassmorphism lighting, high contrast cinematic motion.'
  }
];

// ─── Mini App Mockup – chat messages ─────────────────────────────────────────
const INITIAL_CHAT = [
  {
    role: 'user',
    text: 'How can I increase sales for my small business?',
    time: '10:24 AM'
  },
  {
    role: 'ai',
    text: 'Here are proven ways to increase sales for your small business:\n1. Understand your customers deeply.\n2. Improve your product or service value proposition.\n3. Build a strong digital brand & automated invoices.\n4. Leverage targeted local marketing & referral rewards.\n5. Offer excellent customer service.\n6. Track your revenue metrics & optimize inventory.',
    time: '10:24 AM',
    latency: '1.23s'
  }
];

// ─── Telemetry bar that animates ─────────────────────────────────────────────
function TelemetryBar({ label, value, displayVal, color, icon }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
          <span style={{ color }}>{icon}</span>
          {label}
        </div>
        <span style={{ color, fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', fontSize: '1.05rem' }}>
          {displayVal}
        </span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '99px',
          transition: 'width 0.6s ease'
        }} />
      </div>
    </div>
  );
}

// ─── Copy button component ────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} style={{
      background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
      border: `1px solid ${copied ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.12)'}`,
      color: copied ? '#10b981' : 'rgba(255,255,255,0.7)',
      borderRadius: '6px',
      padding: '0.3rem 0.65rem',
      fontSize: '0.75rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      transition: 'all 0.2s'
    }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── Mini App Mockup inside the Demo page ────────────────────────────────────
function MiniAppMockup() {
  const [activeView, setActiveView] = useState('performance');
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [ragQuery, setRagQuery] = useState('What are the key terms of the payment policy?');
  const [ragAnswer, setRagAnswer] = useState('Payments are due within <strong>30 days</strong> of invoice receipt. Late payments may incur a <strong>5% penalty</strong> after 30 days. All payments should be made via approved bank transfer channels.');
  const [ragLoading, setRagLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const [telemetry, setTelemetry] = useState({
    ram: 72, ramVal: '5.8 GB',
    cpu: 38, cpuVal: '38%',
    tokens: 65, tokensVal: '12.4',
    time: 40, timeVal: '1.23 s'
  });

  // Animate telemetry in performance view
  useEffect(() => {
    if (activeView !== 'performance') return;
    const id = setInterval(() => {
      setTelemetry(prev => {
        const cpu = Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10));
        const tokens = Math.max(40, Math.min(90, prev.tokens + (Math.random() - 0.5) * 8));
        const time = Math.max(25, Math.min(65, prev.time + (Math.random() - 0.5) * 5));
        return {
          ram: prev.ram,
          ramVal: prev.ramVal,
          cpu: Math.round(cpu),
          cpuVal: `${Math.round(cpu)}%`,
          tokens: Math.round(tokens),
          tokensVal: (tokens / 5).toFixed(1),
          time: Math.round(time),
          timeVal: `${(time / 40).toFixed(2)} s`
        };
      });
    }, 1500);
    return () => clearInterval(id);
  }, [activeView]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput.trim(), time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      const aiMsg = {
        role: 'ai',
        text: `Offline execution complete for "${userMsg.text}". Data processed 100% locally on CPU without external network calls.`,
        time: 'Just now',
        latency: '1.18s'
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 700);
  };

  const runRag = () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    setRagAnswer('');
    setTimeout(() => {
      setRagAnswer('Payments are due within <strong>30 days</strong> of invoice receipt. Late payments may incur a <strong>5% penalty</strong> after 30 days. All payments should be made via approved bank transfer channels.');
      setRagLoading(false);
    }, 900);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const tabBtns = [
    { id: 'performance', label: 'Live Performance', icon: <BarChart3 size={13} />, color: '#FFA600' },
    { id: 'business', label: 'Business Analytics', icon: <TrendingUp size={13} />, color: '#38bdf8' },
    { id: 'rag', label: 'RAG Document Search', icon: <FileSearch size={13} />, color: '#10b981' }
  ];

  const sidebarItems = [
    { id: 'chat', label: 'AI Chat', icon: <MessageSquare size={14} />, color: '#FFA600' },
    { id: 'docs', label: 'Documents', icon: <FileText size={14} />, color: '#38bdf8' },
    { id: 'kb', label: 'Knowledge Base', icon: <Database size={14} />, color: '#a855f7' },
    { id: 'settings', label: 'Settings', icon: <Settings size={14} />, color: '#10b981' },
    { id: 'perf', label: 'Performance', icon: <Gauge size={14} />, color: '#FFA600' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #060913 0%, #0A0F22 100%)',
      border: '1px solid rgba(255,166,0,0.25)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,166,0,0.1)'
    }}>
      {/* Window Title Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        background: 'rgba(0,0,0,0.5)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '8px',
            background: 'linear-gradient(135deg, #FFA600, #FF6B00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '0.9rem', color: '#000'
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Casjoe Local AI</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>v1.0 (Offline Build)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* View Tabs */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', gap: '2px' }}>
            {tabBtns.map(tab => (
              <button key={tab.id} onClick={() => setActiveView(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s',
                background: activeView === tab.id ? 'rgba(255,166,0,0.15)' : 'transparent',
                color: activeView === tab.id ? tab.color : 'rgba(255,255,255,0.45)',
                boxShadow: activeView === tab.id ? `0 0 0 1px ${tab.color}44` : 'none'
              }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Status + Window controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981' }} />
            Running Locally
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFA600', opacity: 0.7 }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
          </div>
        </div>
      </div>

      {/* App Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', minHeight: '460px' }}>
        {/* Sidebar */}
        <div style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.3)',
          padding: '1rem 0.6rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {sidebarItems.map((item, i) => (
              <li key={item.id}>
                <button style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s', textAlign: 'left',
                  background: i === 0 ? 'rgba(255,166,0,0.12)' : 'transparent',
                  color: i === 0 ? '#FFA600' : 'rgba(255,255,255,0.5)',
                  boxShadow: i === 0 ? '0 0 0 1px rgba(255,166,0,0.25)' : 'none'
                }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '8px',
            padding: '0.65rem',
            fontSize: '0.7rem'
          }}>
            <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Offline Mode
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <WifiOff size={10} style={{ color: '#FFA600' }} /> No Internet Required
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div style={{ padding: '1.25rem', overflow: 'hidden' }}>
          {/* PERFORMANCE VIEW */}
          {activeView === 'performance' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                <TelemetryBar label="RAM Usage" value={telemetry.ram} displayVal={telemetry.ramVal} color="#a855f7" icon={<HardDrive size={14} />} />
                <TelemetryBar label="CPU Usage" value={telemetry.cpu} displayVal={telemetry.cpuVal} color="#10b981" icon={<Cpu size={14} />} />
                <TelemetryBar label="Tokens/sec" value={telemetry.tokens} displayVal={telemetry.tokensVal} color="#FFA600" icon={<Zap size={14} />} />
                <TelemetryBar label="Response Time" value={telemetry.time} displayVal={telemetry.timeVal} color="#38bdf8" icon={<Clock size={14} />} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {/* Live Chat Box */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFA600' }}>
                      <Brain size={14} /> AI Chat (Local Model)
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      🔒 100% Offline
                    </span>
                  </div>
                  <div ref={chatBoxRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px' }}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '4px 12px 12px 12px',
                        background: msg.role === 'user' ? 'rgba(255,166,0,0.12)' : 'rgba(255,255,255,0.04)',
                        border: msg.role === 'user' ? '1px solid rgba(255,166,0,0.2)' : '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.75rem',
                        lineHeight: 1.5
                      }}>
                        <div style={{ fontWeight: 700, color: msg.role === 'user' ? '#FFA600' : '#a855f7', marginBottom: '0.2rem', fontSize: '0.7rem' }}>
                          {msg.role === 'user' ? 'You' : '🧠 Casjoe Local AI'}
                        </div>
                        <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', marginTop: '0.2rem' }}>
                          {msg.time}{msg.latency && ` • Generated in ${msg.latency}`}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendChat()}
                      placeholder="Type your business prompt..."
                      style={{
                        flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px', padding: '0.45rem 0.75rem', color: '#fff', fontSize: '0.78rem',
                        outline: 'none'
                      }}
                    />
                    <button onClick={sendChat} style={{
                      background: 'linear-gradient(135deg, #FFA600, #FF6B00)',
                      border: 'none', borderRadius: '8px', padding: '0.45rem 0.75rem',
                      color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700
                    }}>
                      <Send size={13} />
                    </button>
                  </div>
                </div>

                {/* Performance Chart (SVG) */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BarChart3 size={14} /> Performance Over Time
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Real-Time Metrics</span>
                  </div>
                  <svg viewBox="0 0 500 200" style={{ width: '100%', height: '170px' }}>
                    <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    {/* CPU */}
                    <path d="M0,70 Q75,60 150,75 T300,65 T450,70 T500,65" fill="none" stroke="#10b981" strokeWidth="2.5" />
                    {/* RAM */}
                    <path d="M0,110 Q75,100 150,115 T300,105 T450,110 T500,108" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                    {/* Tokens */}
                    <path d="M0,150 Q75,140 150,155 T300,145 T450,150 T500,148" fill="none" stroke="#FFA600" strokeWidth="2.5" />
                    {/* Response */}
                    <path d="M0,175 Q75,170 150,178 T300,172 T450,175 T500,174" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
                    <span style={{ color: '#10b981' }}>■ CPU %</span>
                    <span style={{ color: '#a855f7' }}>■ RAM</span>
                    <span style={{ color: '#FFA600' }}>■ Tokens/s</span>
                    <span style={{ color: '#38bdf8' }}>■ Latency</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BUSINESS ANALYTICS VIEW */}
          {activeView === 'business' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { icon: <Users size={14} />, label: 'Customers', val: '1,248', sub: '+14% this month', color: '#FFA600', subColor: '#10b981' },
                  { icon: <ShoppingCart size={14} />, label: 'Sales', val: '₦12.4M', sub: '+18% increase', color: '#FFA600', subColor: '#10b981' },
                  { icon: <TrendingUp size={14} />, label: 'Revenue', val: '₦9.8M', sub: '+22% profit margin', color: '#38bdf8', subColor: '#10b981' },
                  { icon: <Sparkles size={14} />, label: 'AI Tasks', val: '842', sub: 'Completed offline', color: '#a855f7', subColor: 'rgba(255,255,255,0.4)' }
                ].map((card, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: card.color }}>{card.icon}</span>
                      {card.label}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: card.color, marginBottom: '0.3rem' }}>{card.val}</div>
                    <div style={{ fontSize: '0.72rem', color: card.subColor }}>{card.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                {['Add Customer', 'Create Invoice', 'Add Task', 'AI Report'].map((btn, i) => (
                  <button key={i} style={{
                    padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,166,0,0.25)',
                    background: 'rgba(255,166,0,0.06)', color: '#FFA600', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
                    transition: 'all 0.2s'
                  }}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RAG DOCUMENT SEARCH VIEW */}
          {activeView === 'rag' && (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFA600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileSearch size={15} /> Local Document RAG Search
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255,166,0,0.12)', border: '1px solid rgba(255,166,0,0.25)', color: '#FFA600', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                    ChromaDB / FAISS Engine
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Indexed Documents:</div>
                    {[
                      { name: 'Business_Proposal.pdf', color: '#FFA600', active: true },
                      { name: 'HR_Policy.docx', color: '#38bdf8', active: false },
                      { name: 'Sales_Report.xlsx', color: '#10b981', active: false },
                      { name: 'Operations_Manual.pdf', color: '#a855f7', active: false }
                    ].map((doc, i) => (
                      <div key={i} style={{
                        padding: '0.5rem 0.65rem', borderRadius: '8px', marginBottom: '0.3rem', cursor: 'pointer',
                        background: doc.active ? 'rgba(255,166,0,0.1)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${doc.active ? 'rgba(255,166,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
                        fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)'
                      }}>
                        <span style={{ color: doc.color }}>📄</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={e => setRagQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && runRag()}
                        style={{
                          flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.78rem', outline: 'none'
                        }}
                      />
                      <button onClick={runRag} style={{
                        background: 'linear-gradient(135deg, #FFA600, #FF6B00)', border: 'none',
                        borderRadius: '8px', padding: '0.5rem 0.85rem', color: '#000', cursor: 'pointer', fontWeight: 700
                      }}>
                        <Search size={14} />
                      </button>
                    </div>

                    <div style={{ background: 'rgba(0,0,50,0.6)', border: '1px solid rgba(255,166,0,0.3)', borderRadius: '10px', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#FFA600', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Sparkles size={12} /> AI Answer (From Local Vector Search):
                      </div>
                      {ragLoading ? (
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontStyle: 'italic' }}>Searching local vector index…</div>
                      ) : ragAnswer ? (
                        <>
                          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: ragAnswer }} />
                          <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>
                            <strong>Sources:</strong> Business_Proposal.pdf (Page 7, Sec 4.2) • HR_Policy.docx (Page 12)
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Spec Footer */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.4)'
      }}>
        {[
          { label: 'Model', val: 'Mistral / Llama3' },
          { label: 'Quantization', val: 'Q4_K_M' },
          { label: 'Context Window', val: '4096' },
          { label: 'Threads', val: '8 Cores' },
          { label: 'Backend', val: 'llama.cpp C++' },
          { label: 'Device', val: '8GB CPU' }
        ].map((spec, i) => (
          <div key={i} style={{
            padding: '0.6rem 1rem',
            borderRight: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{spec.label}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFA600' }}>{spec.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2-Minute Demo Player ─────────────────────────────────────────────────────
function DemoPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const currentScene = SCENES[currentIdx];

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const speakNarration = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    }
  };

  const loadScene = (idx, withAudio = false) => {
    setCurrentIdx(idx);
    if (withAudio) speakNarration(SCENES[idx].plainScript);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      loadScene(currentIdx, true);
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 1;
          if (next > 120) {
            clearInterval(timerRef.current);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setIsPlaying(false);
            return prev;
          }
          // Advance scene
          const newIdx = next <= 15 ? 0 : next <= 35 ? 1 : next <= 75 ? 2 : next <= 105 ? 3 : 4;
          setCurrentIdx(ci => {
            if (newIdx !== ci) speakNarration(SCENES[newIdx].plainScript);
            return newIdx;
          });
          return next;
        });
      }, 1000);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setElapsed(0);
    setCurrentIdx(0);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const progress = (elapsed / 120) * 100;

  return (
    <div style={{ background: 'rgba(9,15,31,0.8)', border: `1px solid ${currentScene.color}44`, borderRadius: '16px', overflow: 'hidden', transition: 'border-color 0.6s' }}>
      {/* Scene Display */}
      <div style={{
        minHeight: '280px',
        background: `linear-gradient(135deg, ${currentScene.bgColor}, rgba(0,0,0,0.4))`,
        position: 'relative',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'background 0.6s',
        borderBottom: `1px solid ${currentScene.color}22`
      }}>
        {/* Scene progression dots */}
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.5rem', display: 'flex', gap: '0.4rem' }}>
          {SCENES.map((s, i) => (
            <button key={i} onClick={() => { if (!isPlaying) loadScene(i); }} style={{
              width: i === currentIdx ? 24 : 8, height: 8, borderRadius: '99px',
              background: i === currentIdx ? s.color : 'rgba(255,255,255,0.15)',
              border: 'none', cursor: isPlaying ? 'default' : 'pointer',
              transition: 'all 0.3s'
            }} />
          ))}
        </div>

        {/* Wi-Fi off badge */}
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.3rem 0.75rem', borderRadius: '99px' }}>
          <WifiOff size={12} /> Wi-Fi: OFF
        </div>

        {/* Scene number badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: `${currentScene.color}22`,
          border: `1px solid ${currentScene.color}44`,
          color: currentScene.color,
          padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700,
          marginBottom: '0.75rem', width: 'fit-content', transition: 'all 0.4s'
        }}>
          <Clock size={12} /> Scene {currentScene.id} ({currentScene.timeRange})
        </div>

        <h3 style={{ fontSize: '1.2rem', color: currentScene.color, margin: '0 0 0.5rem 0', transition: 'color 0.4s' }}>
          {currentScene.title}
        </h3>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.8)' }}
          dangerouslySetInnerHTML={{ __html: currentScene.scriptHtml }} />
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: currentScene.color, transition: 'width 1s linear' }} />
      </div>

      {/* Controls */}
      <div style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button onClick={handlePlayPause} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, #FFA600, #FF6B00)', border: 'none',
            borderRadius: '8px', padding: '0.6rem 1.1rem', color: '#000', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem'
          }}>
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            {isPlaying ? 'Pause Demo' : elapsed > 0 ? 'Resume Demo' : 'Play Demo & Audio'}
          </button>
          <button onClick={() => speakNarration(currentScene.plainScript)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'transparent', border: '1px solid rgba(255,166,0,0.4)',
            borderRadius: '8px', padding: '0.6rem 1rem', color: '#FFA600', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
          }}>
            <Volume2 size={15} /> Read Voiceover
          </button>
          <button onClick={handleReset} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.85rem'
          }}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>

        <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#FFA600', fontSize: '1.1rem' }}>
          Timer: {formatTime(elapsed)} / 2:00
        </div>
      </div>
    </div>
  );
}

// ─── Main DemoView Export ─────────────────────────────────────────────────────
export default function DemoView() {
  return (
    <div style={{ padding: '1.5rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(255,166,0,0.1)', border: '1px solid rgba(255,166,0,0.3)',
          borderRadius: '99px', padding: '0.35rem 1.1rem', fontSize: '0.82rem',
          color: '#FFA600', fontWeight: 700, marginBottom: '1.25rem'
        }}>
          <Zap size={14} /> Fast. Efficient. Built for Local.
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          margin: '0 0 0.75rem 0'
        }}>
          Enterprise AI.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FFA600, #FF6B00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Zero Cloud.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem 0' }}>
          Run powerful AI on standard 8 GB laptops — no internet required, 100% private data, zero API fees.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,166,0,0.12)', border: '1px solid rgba(255,166,0,0.35)', padding: '0.45rem 1.1rem', borderRadius: '99px', fontSize: '0.85rem', color: '#FFA600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Laptop size={14} /> Runs on 8 GB Laptops
          </div>
          <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', padding: '0.45rem 1.1rem', borderRadius: '99px', fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={14} /> Private & Secure
          </div>
        </div>
      </div>

      {/* Section 1: App UI Demo */}
      <section id="app-ui-demo" style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{
              background: 'rgba(255,166,0,0.12)', border: '1px solid rgba(255,166,0,0.3)',
              color: '#FFA600', padding: '0.2rem 0.7rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700
            }}>
              Desktop Dashboard
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Interactive App Demo</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0.3rem 0 0 0' }}>Explore the live mockup — switch views, type prompts, run RAG searches.</p>
        </div>
        <MiniAppMockup />
      </section>

      {/* Section 2: 2-Minute Video Demo */}
      <section id="video-section" style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            background: 'rgba(255,166,0,0.12)', border: '1px solid rgba(255,166,0,0.3)',
            color: '#FFA600', padding: '0.2rem 0.7rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem'
          }}>
            <Film size={12} /> Challenge Submission Video
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem 0' }}>2-Minute Technical Demonstration</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Listen to Casper Joe Okpara's narration script & view scene walkthroughs.</p>
        </div>
        <DemoPlayer />
      </section>

      {/* Section 3: Video Generation Prompts */}
      <section id="prompts-section" style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            background: 'rgba(255,166,0,0.12)', border: '1px solid rgba(255,166,0,0.3)',
            color: '#FFA600', padding: '0.2rem 0.7rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem'
          }}>
            <Sparkles size={12} /> AI Prompts
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem 0' }}>Video Generation Prompts</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Use these prompts in AI video generators (Veo 3, Runway, Pika, Kling) for cinematic B-roll clips.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {VIDEO_PROMPTS.map((vp, i) => (
            <div key={i} style={{
              background: vp.bg,
              border: `1px solid ${vp.border}`,
              borderRadius: '14px',
              padding: '1.25rem',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '10px',
                    background: `${vp.color}20`,
                    border: `1px solid ${vp.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem'
                  }}>
                    {vp.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{vp.platform}</h3>
                </div>
                <CopyButton text={vp.prompt} />
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                padding: '0.85rem',
                fontSize: '0.8rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-mono, "Fira Code", monospace)'
              }}>
                {vp.prompt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '2rem 0 0', borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
        © 2026 <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Casjoetech Ltd</strong>. Africa Deep Tech Challenge Technical Entry.
      </div>
    </div>
  );
}
