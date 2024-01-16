import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export default async function handler(  
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { prompt, tag, userId } = request.body;
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tag: tag,
        });
        await newPrompt.save();
        response.status(201).json(newPrompt);
    } catch (error) {
        respose.status(500).json({ error: error }
    }
}
