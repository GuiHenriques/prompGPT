import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import Prompt from "@/models/prompt";

export async function GET( response: NextResponse) {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch prompts", { status: 500})    
    }
}
