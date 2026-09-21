import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  Mic, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  CheckCheck,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

interface InAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  recipientName: string;
  recipientRole: UserRole;
  currentUserId: string;
  currentUserName: string;
  onDraftContractForUser: (name: string) => void;
  darkMode: boolean;
}

export const InAppChatModal: React.FC<InAppChatModalProps> = ({
  isOpen,
  onClose,
  recipientId,
  recipientName,
  recipientRole,
  currentUserId,
  currentUserName,
  onDraftContractForUser,
  darkMode,
}) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'other',
      text: `Hello! I saw your verified profile on TrustConnect. Are you available for a discussion regarding domestic work in Kampala?`,
      time: '10:15 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Responsive simulation reply
    setTimeout(() => {
      const replies = [
        `Yes, absolutely! My National ID and biometric records are fully verified. I am ready to start as soon as we agree on terms.`,
        `That sounds very good. Can you send over the formal contract draft through the TrustConnect dashboard so I can review with my guarantor?`,
        `Thank you so much! Looking forward to working with your family.`
      ];
      setMessages(prev => [
        ...prev,
        {
          id: `rep-${Date.now()}`,
          sender: 'other',
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1400);
  };

  const handleSendAudioNote = () => {
    setIsRecordingAudio(true);
    setTimeout(() => {
      setIsRecordingAudio(false);
      setMessages(prev => [
        ...prev,
        {
          id: `aud-${Date.now()}`,
          sender: 'me',
          text: '🎙️ Voice Note (0:18) • "Hello, explaining my domestic schedule and cooking experience..."',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border flex flex-col h-[580px] transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-white/80 flex items-center justify-center font-bold text-sm">
                {recipientName.substring(0, 2).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm sm:text-base">{recipientName}</h4>
                <ShieldCheck className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-[11px] text-emerald-200">
                {recipientRole === 'maid' ? 'Verified House Maid' : 'Verified Employer'} • Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href="tel:+256772419802"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                onClose();
                onDraftContractForUser(recipientName);
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Offer Contract</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Warning Tag */}
        <div className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>End-to-End Encrypted & NIRA Identity Verified</span>
          </span>
          <span className="font-semibold">TrustConnect Safety Protocol</span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map(m => {
            const isMe = m.sender === 'me';
            return (
              <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  isMe
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700'
                }`}>
                  {m.text}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-0.5 px-1">
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSendAudioNote}
            className={`p-2 rounded-xl border text-slate-600 dark:text-slate-400 cursor-pointer ${
              isRecordingAudio ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Record Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message or discuss contract terms..."
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
