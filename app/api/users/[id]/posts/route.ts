import { connectToDB } from "@/utils/database";

import Prompt from "@/models/prompt";

export const GET = async (res: Response, {params}: {params: {id: string}}) => {
    try {
        console.log('id', params.id)
        await connectToDB();
        const prompts = await Prompt.find({ creator: params.id }).populate("creator");
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch posts", {status: 500})
    }
}