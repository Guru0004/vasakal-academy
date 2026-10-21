import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  ArrowRight,
  ExternalLink,
  Phone,
  RotateCcw,
  ShieldAlert,
  Compass,
  Clock
} from "lucide-react";
import { useUser } from "../context/UserContext";
import {
  processAcademyQuery,
  getPersonalizedGreeting,
  navigateToSection,
  QUICK_SUGGESTIONS
} from "../data/aiBotKnowledge";

export const AIBot = () => {
  const { isNewVisitor, getTimeGreeting } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showPreviewTooltip, setShowPreviewTooltip] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const timeInfo = getTimeGreeting();

  // Initialize or re-evaluate greeting when visitor status changes
  useEffect(() => {
    const greeting = getPersonalizedGreeting(timeInfo, isNewVisitor);
    setMessages([
      {
        id: "init-greeting",
        sender: "bot",
        text: greeting.text,
        actions: greeting.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  }, [isNewVisitor]);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowPreviewTooltip(false);
    }
  }, [isOpen]);

  // Handle user sending a query
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Realistic brief typing delay
    setTimeout(() => {
      const response = processAcademyQuery(query);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        actions: response.actions,
        isGuardrailTriggered: response.isGuardrailTriggered,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    if (action.targetId) {
      const success = navigateToSection(action.targetId);
      if (success) {
        // Close on mobile for smooth view, keep open on desktop
        if (window.innerWidth < 640) {
          setIsOpen(false);
        }
      }
    } else if (action.externalUrl) {
      window.open(action.externalUrl, "_blank", "noopener,noreferrer");
    } else if (action.phoneUrl) {
      window.location.href = action.phoneUrl;
    }
  };

  const handleResetChat = () => {
    const greeting = getPersonalizedGreeting(timeInfo, isNewVisitor);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "bot",
        text: greeting.text,
        actions: greeting.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Helper to render text with bold and list highlights
  const renderFormattedText = (text) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Format bold **text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedParts = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-[#071A3D] dark:text-blue-100">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={pIdx} className="italic text-gray-700 dark:text-slate-300">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          });

          if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1">
                <span className="text-blue-500 font-bold">•</span>
                <span className="flex-1">{formattedParts}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedParts}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button & Preview Tooltip */}
      <div className="fixed bottom-20 sm:bottom-7 right-5 sm:right-7 z-40 flex flex-col items-end">
        {/* Dynamic Greeting Preview Bubble (shown when collapsed) */}
        <AnimatePresence>
          {!isOpen && showPreviewTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-3 max-w-xs sm:max-w-sm bg-white dark:bg-[#0B2552] p-3 rounded-2xl shadow-2xl border border-blue-200 dark:border-blue-500/40 relative group cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreviewTooltip(false);
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 dark:bg-navy-900 rounded-full text-xs flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform shadow-xs"
                aria-label="Dismiss greeting"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                      {timeInfo.greeting} {timeInfo.emoji}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 font-bold">
                      Vasakal AI
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-slate-200 font-medium line-clamp-2">
                    {isNewVisitor
                      ? "Welcome to Vasakal Academy! Ask me anything about our campus & courses."
                      : "Welcome back! Looking for Super 30, hostel facilities, or admissions?"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Bot Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowPreviewTooltip(false);
          }}
          aria-label={isOpen ? "Close AI Bot" : "Open Vasakal Academy AI Bot"}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#071A3D] via-[#12366B] to-blue-600 text-white shadow-2xl flex items-center justify-center border-2 border-white/30 dark:border-blue-400/30 group cursor-pointer transition-all duration-300"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-2xl bg-blue-500/30 dark:bg-blue-400/20 blur-sm group-hover:blur-md animate-pulse" />

          {/* Active online dot */}
          <span className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#071A3D] shadow-xs z-10" />

          {isOpen ? (
            <X className="w-7 h-7 relative z-10 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center gap-0">
              {/* Cute Robotic Face SVG */}
              <svg
                width="42"
                height="44"
                viewBox="0 0 42 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                {/* Antenna pole */}
                <line x1="21" y1="5" x2="21" y2="11" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round"/>
                {/* Antenna orb with glow */}
                <circle cx="21" cy="4" r="2.8" fill="#60A5FA">
                  <animate attributeName="r" values="2.8;3.4;2.8" dur="1.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.7;1" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="21" cy="4" r="1.4" fill="white" opacity="0.85"/>

                {/* Robot head */}
                <rect x="6" y="11" width="30" height="25" rx="7" fill="#DBEAFE"/>
                {/* Head sheen */}
                <rect x="8" y="12.5" width="12" height="4" rx="2" fill="white" opacity="0.35"/>

                {/* Ear bolts */}
                <rect x="3" y="19" width="4" height="6" rx="2" fill="#93C5FD"/>
                <rect x="35" y="19" width="4" height="6" rx="2" fill="#93C5FD"/>

                {/* Eye sockets */}
                <rect x="10" y="16" width="9" height="9" rx="3" fill="#1E3A8A"/>
                <rect x="23" y="16" width="9" height="9" rx="3" fill="#1E3A8A"/>

                {/* Eye pupils (glowing cyan) */}
                <ellipse cx="14.5" cy="20.5" rx="3" ry="3" fill="#38BDF8">
                  <animate attributeName="ry" values="3;3;3;0.4;3;3;3;3;0.4;3" dur="5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="27.5" cy="20.5" rx="3" ry="3" fill="#38BDF8">
                  <animate attributeName="ry" values="3;3;3;0.4;3;3;3;3;0.4;3" dur="5s" repeatCount="indefinite"/>
                </ellipse>

                {/* Pupil shine dots */}
                <circle cx="16" cy="19" r="1" fill="white" opacity="0.9"/>
                <circle cx="29" cy="19" r="1" fill="white" opacity="0.9"/>

                {/* Rosy cheeks */}
                <ellipse cx="10" cy="30" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55"/>
                <ellipse cx="32" cy="30" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55"/>

                {/* Mouth panel */}
                <rect x="13" y="28" width="16" height="6" rx="3" fill="#1E3A8A"/>
                {/* Smile teeth */}
                <rect x="15" y="29.5" width="3.5" height="3" rx="1" fill="#7DD3FC"/>
                <rect x="19.5" y="29.5" width="3.5" height="3" rx="1" fill="#7DD3FC"/>
                <rect x="24" y="29.5" width="3.5" height="3" rx="1" fill="#7DD3FC"/>

                {/* Tiny star sparkle top-right corner */}
                <path d="M37 10 L37.6 11.8 L39.5 12 L37.6 12.2 L37 14 L36.4 12.2 L34.5 12 L36.4 11.8 Z" fill="#FDE68A" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          )}
        </motion.button>
      </div>

      {/* Main AI Chat Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-24 sm:bottom-28 right-3 sm:right-7 z-50 w-[95vw] sm:w-[430px] h-[610px] max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-[#071A3D] shadow-[0_20px_60px_-15px_rgba(7,26,61,0.4)] border border-gray-200 dark:border-blue-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#071A3D] via-[#0B2552] to-[#12366B] px-4 py-3.5 text-white shadow-md">
              <div className="flex items-center justify-between">
                {/* Bot Profile */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-white/20">
                    <Bot className="w-6 h-6" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#071A3D]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wide text-white">
                        Vasakal AI Navigator
                      </h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-400/25 text-blue-200 border border-blue-400/30">
                        Official
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-blue-200">
                      <Clock className="w-3 h-3" />
                      <span>{timeInfo.greeting}</span>
                      <span>•</span>
                      <span>Bodinayakanur</span>
                    </div>
                  </div>
                </div>

                {/* Header Action Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    title="Restart Conversation"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-blue-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Bot"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-blue-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scope Notice Banner */}
            <div className="bg-blue-50 dark:bg-[#0B2552]/80 px-4 py-2 border-b border-blue-100 dark:border-blue-900/60 flex items-center justify-between text-[11px] text-[#071A3D] dark:text-blue-200 font-medium">
              <span className="flex items-center gap-1.5 truncate">
                <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Navigating Vasakal Academy Programs & Campus only</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 shrink-0 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Website Guard</span>
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/60 dark:bg-[#040E22]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[84%] rounded-2xl px-4 py-3 shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#071A3D] text-white dark:bg-blue-600 dark:text-white rounded-br-xs"
                        : msg.isGuardrailTriggered
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 border border-amber-200 dark:border-amber-800/60 rounded-bl-xs"
                        : "bg-white dark:bg-[#0B2552] text-gray-800 dark:text-slate-100 border border-gray-200 dark:border-blue-900/40 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {/* Bot header inside bubble */}
                    {msg.sender === "bot" && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-300">
                        {msg.isGuardrailTriggered ? (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span className="text-amber-700 dark:text-amber-300">Domain Restriction</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Vasakal Academic Guide</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Message content */}
                    {renderFormattedText(msg.text)}

                    {/* Action navigation buttons */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 text-[#071A3D] dark:text-blue-100 border border-blue-200 dark:border-blue-700/50 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-2xs"
                          >
                            <span>{act.label}</span>
                            {act.targetId && <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                            {act.externalUrl && <ExternalLink className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                            {act.phoneUrl && <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-gray-400 dark:text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 max-w-[80%] rounded-2xl px-4 py-3 bg-white dark:bg-[#0B2552] border border-gray-200 dark:border-blue-900/40 rounded-bl-xs">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-bounce" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 ml-1">Directing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips Carousel */}
            <div className="px-3 py-2 bg-gray-100/90 dark:bg-[#071A3D] border-t border-gray-200 dark:border-blue-900/40">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 shrink-0">
                  Quick:
                </span>
                {QUICK_SUGGESTIONS.map((sugg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sugg)}
                    className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#0B2552] text-[#071A3D] dark:text-blue-100 border border-gray-200 dark:border-blue-800 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-[#071A3D] border-t border-gray-200 dark:border-blue-900/60 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Super 30, hostel, faculty, admissions..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-blue-500/40 bg-gray-50 dark:bg-[#0B2552] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bg-[#071A3D] hover:bg-[#12366B] dark:bg-blue-600 dark:hover:bg-blue-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
