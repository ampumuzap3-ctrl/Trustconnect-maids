import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Headphones, 
  Clock, 
  CheckCheck,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { OFFICIAL_CEO_INFO } from '../data/mockData';

interface CustomerCare247ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  darkMode: boolean;
}

export const CustomerCare247Modal: React.FC<CustomerCare247ModalProps> = ({
  isOpen,
  onClose,
  userName,
  darkMode,
}) => {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'agent',
      name: 'Joan (TrustConnect Care)',
      text: `Hello ${userName || 'there'}! Welcome to TrustConnect 24/7 Support Desk. How can we assist your domestic staffing or verification today?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      name: userName || 'You',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Automated smart assistant response
    setTimeout(() => {
      const botReplies = [
        `Thank you for contacting TrustConnect. For urgent verification or Mobile Money assistance regarding our CEO account (0785490344 - Mugisha El-shaddai), an officer has been flagged. You can also dial our 24/7 hotline directly on 07518446077.`,
        `Understood! All domestic contracts on TrustConnect are protected by our Ugandan labor guarantee. If you need replacement or background checks, our Nakasero office handles it immediately.`,
        `Your inquiry has been logged with Priority Ticket #TC-CARE-${Math.floor(1000 + Math.random() * 9000)}. Our supervisor is monitoring this live.`
      ];
      const reply = {
        id: `m-rep-${Date.now()}`,
        sender: 'agent',
        name: 'Supervisor Mugisha Desk',
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border flex flex-col h-[560px] transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Header with Hotline */}
        <div className="p-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative p-2 rounded-xl bg-amber-400 text-slate-950">
              <Headphones className="w-5 h-5 font-bold" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold">24/7 Live Customer Care</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> Direct Hotline: {OFFICIAL_CEO_INFO.customerCareHotline}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Buttons (Call & WhatsApp) */}
        <div className="p-3 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 shrink-0">
          <a
            href={`tel:${OFFICIAL_CEO_INFO.customerCareHotline}`}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Hotline ({OFFICIAL_CEO_INFO.customerCareHotline})</span>
          </a>

          <a
            href={`https://wa.me/2567518446077?text=Hello%20TrustConnect%20Uganda,%20I%20need%20assistance%20with%20domestic%20staffing%20and%20verification`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-1 font-bold text-amber-900 dark:text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>TrustConnect Executive Guarantee:</span>
            </div>
            <p>
              Direct oversight by CEO Mugisha El-shaddai. For Mobile Money inquiries to 0785490344 or dispute resolution, our agents respond 24 hours a day, 7 days a week.
            </p>
          </div>

          {messages.map(m => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-0.5 px-1">{m.name}</span>
                <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your message for immediate 24/7 care..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
