import React, { useState, useRef, useEffect } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  HelpCircle, 
  Code2, 
  Lightbulb, 
  BookOpen, 
  Minimize2,
  Maximize2,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  codeSnippet?: string;
  time: string;
}

export const AiTutorDrawer: React.FC = () => {
  const { activeCourse } = useLms();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "👋 Hey there! I'm your LearnSphere AI Mentor. Ask me any conceptual question, request a quick quiz question, or paste tricky code you'd like me to explain!",
      time: 'Just now'
    }
  ]);

  const quickPrompts = [
    { label: 'Explain Server Components', prompt: 'Explain the core difference between Server Components and Client Components in React 19.' },
    { label: 'Quiz me on AI Agents', prompt: 'Give me a fast multiple-choice question on LangGraph and RAG architectures.' },
    { label: 'Debug pattern', prompt: 'What causes hydration mismatch error #418 in Next.js and how do I fix it?' },
    { label: 'Generate summary', prompt: 'Give me a 3-bullet summary of the best practices for production TypeScript types.' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Dynamic smart responses
    setTimeout(() => {
      let aiResponseText = '';
      let snippet: string | undefined;

      const lower = query.toLowerCase();

      if (lower.includes('server component') || lower.includes('react 19')) {
        aiResponseText = "In React 19 & Next.js App Router:\n• Server Components execute exclusively on the server at request or build time, shipping zero JavaScript bundles to the browser.\n• Client Components (`'use client'`) handle interactive events (onClick, useState, useEffect).\n\n💡 Pro tip: Keep stateful Client Components at the lowest branch of your DOM tree for optimal payload size!";
        snippet = `// Server Component (Default)\nexport default async function FeedPage() {\n  const data = await fetch('https://api.internal/posts').then(r => r.json());\n  return <ClientLikeButton initialLikes={data.likes} />;\n}`;
      } else if (lower.includes('quiz')) {
        aiResponseText = "🎯 Quick Knowledge Check:\n\n**Question:** When embedding documents for vector search in RAG, what happens if chunk size is too small (e.g. 20 tokens)?\n\n**A)** You lose semantic context.\n**B)** Vector dimensions double.\n**C)** Cosine similarity becomes negative.\n\n*(Reply with your chosen letter to see if you got it!)*";
      } else if (lower.includes('hydration') || lower.includes('mismatch')) {
        aiResponseText = "Hydration errors occur when the pre-rendered server HTML differs from the initial client render tree. Common causes:\n1. Non-deterministic values (`Date.now()`, `Math.random()`)\n2. Accessing `localStorage` or `window` before mount\n3. Invalid HTML nesting like `<p>` inside `<p>` or `<div>` inside `<p>`.";
        snippet = `// Safe client-only rendering hook pattern:\nconst [mounted, setMounted] = useState(false);\nuseEffect(() => setMounted(true), []);\nif (!mounted) return null;`;
      } else {
        aiResponseText = `Great question regarding **${activeCourse ? activeCourse.title : 'system engineering'}**! In production environments, prioritize modular architecture, type safety at API boundaries with Zod schemas, and deterministic state transitions.`;
        snippet = `type Result<T, E = Error> =\n  | { ok: true; data: T }\n  | { ok: false; error: E };`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        codeSnippet: snippet,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-indigo-500/40 border border-indigo-300/30 transition-all transform hover:-translate-y-1"
          >
            <div className="relative">
              <Bot className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-400 rounded-full animate-pulse ring-2 ring-indigo-600" />
            </div>
            <span className="text-xs font-extrabold tracking-wide">Ask AI Copilot</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* Floating Interactive Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[400px] md:w-[430px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Drawer Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/40">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs">LearnSphere AI Tutor</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-[9px] px-1 py-0 font-bold">
                    Online
                  </Badge>
                </div>
                <p className="text-[10px] text-indigo-200 truncate max-w-[200px]">
                  {activeCourse ? `Context: ${activeCourse.title}` : 'Universal Tech Mentor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Smart Chips */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.prompt)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-600 font-medium whitespace-nowrap transition-all shadow-xs shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                      isAi
                        ? 'bg-white border border-slate-200/90 text-slate-800'
                        : 'bg-indigo-600 text-white rounded-br-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>

                    {/* Optional code snippet box */}
                    {m.codeSnippet && (
                      <div className="mt-2 rounded-xl bg-slate-950 p-2.5 font-mono text-[11px] text-emerald-400 relative overflow-hidden border border-slate-800">
                        <div className="flex justify-between items-center text-[10px] text-slate-500 pb-1 mb-1 border-b border-slate-800">
                          <span>Snippet</span>
                          <button
                            onClick={() => handleCopyCode(m.id, m.codeSnippet!)}
                            className="hover:text-slate-200 flex items-center gap-1"
                          >
                            {copiedId === m.id ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap">{m.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs w-28">
                <Bot className="h-3.5 w-3.5 text-indigo-600 animate-spin" />
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Ask about syntax, architecture, or quizzes..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="rounded-xl text-xs h-10 bg-slate-50 border-slate-200 focus:bg-white"
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 w-10 p-0 flex items-center justify-center shadow-sm shrink-0 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};