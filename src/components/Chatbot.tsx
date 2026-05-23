"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bot, Loader2, Send, X } from "lucide-react";

type ChatRole = "user" | "assistant";

interface Message {
  role: ChatRole;
  content: string;
}

const STARTER_PROMPTS = [
  "What properties do you have available?",
  "Which areas do you cover?",
  "How do I book a valuation?",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hello — I'm the Kingswell assistant. I can help with our available properties, areas we cover, valuations, and how to get in touch. How can I help you today?",
};

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send message");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setError(null);
  };

  if (!mounted) return null;

  const widget = (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Chat panel — bottom left; close only via header X */}
      {open && (
        <div
          className="pointer-events-auto fixed bottom-24 right-4 flex w-[min(calc(100vw-2rem),400px)] flex-col overflow-hidden rounded-lg border border-kingswell-gold/40 bg-white shadow-2xl sm:right-6"
          style={{ maxHeight: "min(32rem, calc(100vh - 8rem))" }}
          role="dialog"
          aria-label="Kingswell chat assistant"
        >
          <header className="flex shrink-0 items-center justify-between bg-kingswell-green px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kingswell-gold/20">
                <Bot className="h-5 w-5 text-kingswell-gold" />
              </span>
              <div>
                <p className="font-serif text-base leading-tight">
                  Kingswell Assistant
                </p>
                <p className="text-xs text-white/75">
                  Ask about properties &amp; our services
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-kingswell-green text-white"
                        : "bg-[#faf9f7] text-gray-700"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg bg-[#faf9f7] px-3 py-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin text-kingswell-gold" />
                    Thinking…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && !loading && (
              <div className="shrink-0 flex flex-wrap gap-2 border-t border-gray-100 px-3 py-2.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => send(prompt)}
                    className="rounded-full border border-kingswell-gold/50 px-3 py-1.5 text-left text-xs font-medium text-kingswell-green transition hover:bg-kingswell-green hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="shrink-0 border-t border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-gray-100 p-3"
            >
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask about properties, areas, valuations…"
                  rows={2}
                  className="min-h-[2.5rem] flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-kingswell-gold focus:ring-1 focus:ring-kingswell-gold/30"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-lg bg-kingswell-gold text-kingswell-green transition hover:bg-kingswell-gold-light disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={resetChat}
                className="mt-2 text-[10px] text-gray-400 hover:text-kingswell-green"
              >
                Start new conversation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Launcher — bottom left only when chat is closed */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto fixed bottom-24 right-4 flex items-center gap-2 rounded-full bg-kingswell-green px-4 py-3.5 text-white shadow-2xl ring-4 ring-kingswell-gold/30 transition-transform hover:scale-105 sm:right-6"
          aria-label="Open chat assistant"
        >
          <span
            className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5"
            aria-hidden
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kingswell-gold opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-kingswell-gold" />
          </span>
          <Bot className="h-5 w-5 shrink-0 text-kingswell-gold" />
          <span className="text-sm font-semibold tracking-wide">Chat</span>
        </button>
      )}
    </div>
  );

  return createPortal(widget, document.body);
}
