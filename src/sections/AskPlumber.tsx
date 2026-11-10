import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Droplets } from 'lucide-react';

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

const suggestedPrompts = [
  'How do I report a leak?',
  'What is NRW?',
  'Pipes in my area?',
  'Why does my bill increase?',
];

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('report') || lower.includes('leak')) {
    return 'To report a leak, tap **Report a Leak** above, snap a photo, tag the location, and submit. You\'ll get a tracking ID and earn **50 community points**! Johannesburg Water typically responds to critical leaks within 24-72 hours.';
  }
  if (lower.includes('pipe') || lower.includes('replacement')) {
    return 'Johannesburg Water is replacing **428 km** of aging pipes over the next 5 years. Areas like **Orange Farm, Soweto, Sharonlea, and Diepkloof** are currently prioritized. The program aims to reduce water losses by replacing critical infrastructure that has reached end of useful lifespan.';
  }
  if (lower.includes('nrw') || lower.includes('revenue') || lower.includes('40%')) {
    return '**Non-Revenue Water (NRW)** is water that enters the system but never gets billed — through leaks, theft, or metering errors. SA\'s **40% NRW** is nearly **double the global average of 22%**. This costs Johannesburg **R7 billion annually** and drives up tariffs for everyone.';
  }
  if (lower.includes('fix') || lower.includes('repair') || lower.includes('fixed')) {
    return 'Once reported, leaks are triaged by severity. **Critical leaks** (major bursts, flooding) are typically addressed within **24-72 hours**. Medium leaks within 1-2 weeks. You can track status in real time on the **Live Leak Map** — your report pin changes color as it moves through: Reported → Under Review → Repair Scheduled → Fixed.';
  }
  if (lower.includes('bill') || lower.includes('cost') || lower.includes('money')) {
    return 'Leaks cost Johannesburg **R7 billion annually**. That cost gets passed to residents through higher tariffs. By reporting leaks, you help keep everyone\'s bills lower. The city loses **70 million liters** of treated drinking water every single day — water that was purified at great expense.';
  }
  if (lower.includes('track') || lower.includes('status') || lower.includes('progress')) {
    return 'Every report gets a unique ID. Check the **Live Leak Map** — your report appears as a pin that changes color as it moves through the pipeline: 🔴 **Reported** → 🟡 **Under Review** → 🔵 **Repair Scheduled** → 🟢 **Fixed**. You\'ll also get SMS updates for critical reports.';
  }
  if (lower.includes('point') || lower.includes('leaderboard') || lower.includes('score') || lower.includes('hero')) {
    return 'You earn **50 points** per verified report. Top reporters appear on the **Community Heroes** leaderboard. Weekly winners get featured and recognized by Johannesburg Water! It\'s our way of saying thank you for being an active citizen.';
  }
  if (lower.includes('johannesburg') || lower.includes('joburg') || lower.includes('jhb')) {
    return 'Johannesburg Water supplies **1.6 billion litres** of potable water daily to 6 million people across the city. The network spans thousands of kilometers of pipes, many over **50 years old**. The current pipe replacement program is the largest infrastructure investment in the city\'s history.';
  }
  if (lower.includes('water') || lower.includes('crisis')) {
    return 'South Africa is a water-scarce country, yet we lose **40%** of treated water to leaks and inefficiencies. In Johannesburg, aging asbestos cement pipes burst regularly, causing street flooding and road damage. FlowFix empowers citizens to be part of the solution by reporting leaks in real time.';
  }

  return 'Great question! I can help with reporting leaks, tracking repairs, understanding NRW, pipe replacement info, or water billing questions. What would you like to know? You can also try clicking one of the suggested prompts below!';
}

export default function AskPlumber() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'ai',
      content: "Hey! I'm **Plumber** — your water-savvy assistant. Ask me about reporting a leak, Johannesburg Water's pipe replacement program, or how to check if a leak has been fixed. I'm here to help! 💧",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg: ChatMessage = { id: Date.now() + 1, role: 'ai', content: response };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <section id="chat" className="bg-[#03045E] py-20">
      <div className="max-w-[480px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00B4D8] flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Playfair_Display'] font-bold text-4xl text-white">
              Ask Plumber
            </h2>
          </div>
          <p className="text-sm text-white/70">
            Our water-savvy AI can help you report leaks, explain water issues, or check pipe replacement progress.
          </p>
        </motion.div>

        {/* Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#1A1A2E] rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          style={{ height: '480px' }}
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#00B4D8] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                    P
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#03045E] text-white rounded-tr-sm'
                      : 'bg-white/[0.08] text-white rounded-tl-sm'
                  }`}
                >
                  <div dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\*\*(.*?)\*/g, '<strong class="text-[#00B4D8]">$1</strong>')
                  }} />
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00B4D8] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                  P
                </div>
                <div className="bg-white/[0.08] rounded-xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-0.5">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 pt-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="flex-shrink-0 bg-white/[0.08] hover:bg-white/[0.15] text-white/80 hover:text-white text-xs px-3 py-1.5 rounded-full transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about water leaks, pipe fixes..."
              className="flex-1 bg-white/[0.08] text-white text-sm px-4 py-2.5 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/40 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-full bg-[#00B4D8] flex items-center justify-center hover:shadow-[0_0_16px_rgba(0,180,216,0.4)] disabled:opacity-40 disabled:hover:shadow-none transition-all"
            >
              <Send className="w-4 h-4 text-[#03045E]" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
