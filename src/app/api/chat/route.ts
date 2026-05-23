import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChatSystemPrompt } from "@/lib/chat-context";

export const dynamic = "force-dynamic";

/** Default Flash model — gemini-2.0-flash has no free-tier quota on many keys */
const DEFAULT_MODEL = "gemini-2.5-flash";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

function buildGeminiHistory(messages: ChatMessage[]) {
  const prior = messages.slice(0, -1);
  let start = 0;
  while (start < prior.length && prior[start].role === "assistant") {
    start += 1;
  }

  return prior.slice(start).map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("model" as const),
    parts: [{ text: m.content }],
  }));
}

function getErrorMessage(err: unknown): string {
  if (!(err instanceof Error)) {
    return "Sorry, I could not respond right now. Please try again or contact us directly.";
  }

  const msg = err.message;

  if (msg.includes("GEMINI_API_KEY")) {
    return "Chat is not configured yet. Please call us or use WhatsApp.";
  }

  if (msg.includes("429") || msg.includes("quota")) {
    return "Our chat assistant is temporarily busy. Please try again in a minute, or contact us by phone or WhatsApp.";
  }

  if (msg.includes("404") || msg.includes("not found")) {
    return "Chat is temporarily unavailable. Please contact us directly.";
  }

  return "Sorry, I could not respond right now. Please try again or contact us directly.";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is not configured yet. Please call us or use WhatsApp." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages?.length) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const last = messages[messages.length - 1];
    if (last.role !== "user" || !last.content.trim()) {
      return NextResponse.json(
        { error: "Last message must be from the user" },
        { status: 400 }
      );
    }

    if (messages.length > 20) {
      return NextResponse.json(
        { error: "Conversation too long. Please start a new chat." },
        { status: 400 }
      );
    }

    const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
    const systemInstruction = await buildChatSystemPrompt();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction,
    });

    const history = buildGeminiHistory(messages);

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.content.trim());
    const reply = result.response.text();

    if (!reply?.trim()) {
      return NextResponse.json(
        { error: "Empty response from assistant. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: reply });
  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json(
      { error: getErrorMessage(err) },
      { status: 500 }
    );
  }
}
