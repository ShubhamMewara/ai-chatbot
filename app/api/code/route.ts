import { auth } from "@clerk/nextjs";
import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library"
import { NextResponse } from "next/server";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.PALM_API_KEY!;

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { content } = body;
        
        const result = await client.generateMessage({
        
          model: MODEL_NAME,// required, which model to use to generate the result
          temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
          candidateCount: 1, // Optional. The number of candidate results to generate.
          prompt: {
            // optional, preamble context to prime responses
            context: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
            // Required. Alternating prompt/response messages.
             messages: [{ content: content }],
          }
    });
    //@ts-ignore
    return NextResponse.json(result[0].candidates[0].content)

        
    } catch(error){
        console.log("[CODE_ERROR]",error);
        return new NextResponse("Internal error",{status: 500});
    }
}