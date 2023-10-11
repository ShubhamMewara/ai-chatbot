import { auth } from "@clerk/nextjs";
import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library"
import { NextResponse } from "next/server";

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.PALM_API_KEY!;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY), 
});

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;
        
        const result = await client.generateText({
        // required, which model to use to generate the result
          model: MODEL_NAME,
          prompt: {
            text: prompt,
        }
    });
    //@ts-ignore
    return NextResponse.json(result[0].candidates[0].output)

        
    } catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error",{status: 500});
    }
}