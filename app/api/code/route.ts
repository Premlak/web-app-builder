import { NextRequest, NextResponse } from "next/server";
import { GenAiCode } from "@/app/_components/GeminiAi";
export async function POST(req: NextRequest){
    const {prompt} = await req.json();
    try{
        const res = await GenAiCode.sendMessage(prompt);
        const result = res.response.text();
        console.log(result);
        return NextResponse.json(JSON.parse(result));
    }catch(e){
        console.log(e);
    }
}