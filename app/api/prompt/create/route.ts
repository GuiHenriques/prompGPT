import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function POST(  
    request: NextRequest,
) {
    const { prompt, tag, userId } = await request.json();
    
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tag: tag,
        });
        await newPrompt.save();
        
        return new Response(JSON.stringify(newPrompt), {status: 201})
        
    } catch (error) {
        return new Response("Failed to create prompt", {status: 500})
    }
}
