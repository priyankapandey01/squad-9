"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "When is the next run?",
  "Is it beginner-friendly?",
  "Where do we meet?",
];

export default function RunAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey, I’m the Squad9 run assistant. Ask me about our runs or running basics.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isSending]);

  const sendMessage = async (content: string) => {
    const question = content.trim();
    if (!question || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The assistant is unavailable right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.reply },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Squad9 run assistant"
          className="flex max-h-[min(38rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden border border-line bg-paper shadow-2xl shadow-black/20"
        >
          <header className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
            <div>
              <p className="font-display text-xl font-bold uppercase leading-none">Squad9 assistant</p>
              <p className="mt-1 text-[10px] font-semibold uppercase text-lime">Runs / Training / Noida</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid h-9 w-9 place-items-center text-paper/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </header>

          <div className="min-h-40 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] px-3 py-2.5 text-sm leading-5 ${
                  message.role === "user"
                    ? "ml-auto bg-ink text-paper"
                    : "border-l-2 border-lime bg-white text-ink"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isSending && (
              <p className="text-xs font-medium text-ink-dim" role="status">Putting that together...</p>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    className="border border-line px-2.5 py-1.5 text-left text-xs text-ink-dim transition-colors hover:border-ink hover:text-ink"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line bg-white p-3">
            <label htmlFor="run-assistant-input" className="sr-only">Ask about a run or running</label>
            <input
              id="run-assistant-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={1000}
              placeholder="Ask about a run or running..."
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-ink-dim/70"
            />
            <button
              type="submit"
              disabled={!draft.trim() || isSending}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center bg-lime text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close run assistant" : "Open run assistant"}
        aria-expanded={isOpen}
        className="grid h-14 w-14 place-items-center rounded-full bg-lime text-ink shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <MessageCircle aria-hidden="true" className="h-6 w-6" />}
      </button>
    </div>
  );
}