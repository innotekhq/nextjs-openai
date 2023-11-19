import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    console.log(chatCompletion);
    const response = {
      response: chatCompletion?.choices[0].message.content?.trim(),
    };
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
