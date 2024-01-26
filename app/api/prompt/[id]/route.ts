import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET
export const GET = async (res: Response, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to GET prompt", { status: 500 });
    }
};

// PATCH

export const PATCH = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt)
            return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to PATCH prompt", { status: 500 });
    }
};

// DELETE
export const DELETE = async (res: Response, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        await Prompt.deleteOne({ _id: params.id }); // Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to DELETE prompt", { status: 500 });
    }
};
