import { NextResponse } from "next/server";
import { events } from "@/lib/events";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getEventContext() {
  return events.map((event) => {
    const date = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(event.startsAt));

    return `${event.title}: ${date} at 7:00 AM, ${event.place}.`;
  }).join("\n");
}

function getFallbackReply(question: string) {
  const text = question.toLowerCase();
  const upcoming = events.find((event) => new Date(event.startsAt).getTime() > Date.now());

  if (/when|date|next run|upcoming|sunday/.test(text)) {
    if (!upcoming) return "There are no upcoming runs listed right now. Check the events section for the latest schedule.";
    const date = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(upcoming.startsAt));
    return `The next scheduled run is ${date} at 7:00 AM in Noida. It’s a 3K, and the exact venue is shared on Friday.`;
  }

  if (/where|location|venue|meet/.test(text)) {
    return "Runs are in Noida. The exact meeting venue is shared on Friday before each run.";
  }

  if (/distance|how far|kilomet|\b3k\b|\b3 km\b/.test(text)) {
    return "The Squad9 run is an easy-paced 3K through Noida, welcoming first-timers and regulars.";
  }

  if (/beginner|pace|slow|regular runner|new to running/.test(text)) {
    return "All paces are welcome. Squad9 runs an easy-paced 3K together, so you don’t need to be a regular runner to join.";
  }

  if (/book|register|sign.?up|spot|join/.test(text)) {
    return "Use a “Book your spot” link on an event card or the “Join a run” button to open the signup page.";
  }

  if (/after|rave|music|game/.test(text)) {
    return "The run is just the start: expect games, music, and a post-run rave. Bring your shoes and stay for the crew.";
  }

  if (/shoe|gear|what should i bring/.test(text)) {
    return "Wear comfortable running shoes you’ve already tried, and bring water. The run is an easy-paced 3K.";
  }

  if (/pain|injur|hurt|injured/.test(text)) {
    return "I can’t assess injuries. Stop if running hurts, and check with a healthcare professional before returning if pain persists.";
  }

  return "I can help with Squad9 run dates, the Noida meetup, pace, and what to expect. For event details that aren’t listed, check the event cards or signup page.";
}

export async function POST(request: Request) {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid chat message." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 10) {
    return NextResponse.json({ error: "Send between 1 and 10 messages." }, { status: 400 });
  }

  const messages = body.messages as Partial<ChatMessage>[];
  if (messages.some((message) =>
    !message ||
    !["user", "assistant"].includes(message.role ?? "") ||
    typeof message.content !== "string" ||
    message.content.length > 1000
  )) {
    return NextResponse.json({ error: "Messages must be under 1,000 characters." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return NextResponse.json({ error: "The last message must be from the user." }, { status: 400 });
  }
  const question = lastMessage.content as string;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: getFallbackReply(question) });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content: `You are the Squad9 run-club assistant for Noida. Answer briefly and warmly. Use this event data for Squad9-specific details, never invent dates, prices, locations, or policies. If a detail is not listed, say you are not sure and direct the user to the signup page. You can offer general, conservative running tips, but do not diagnose injuries; advise users with persistent or serious pain to consult a healthcare professional.\n\nEvent data:\n${getEventContext()}`,
          },
          ...messages as ChatMessage[],
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "The run assistant is busy. Try again shortly." }, { status: 502 });
    }

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "I couldn’t form a reply. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch {
    return NextResponse.json({ error: "The run assistant is temporarily unavailable." }, { status: 502 });
  }
}