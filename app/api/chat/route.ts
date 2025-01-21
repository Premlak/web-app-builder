import { NextRequest, NextResponse } from "next/server";
import {chatSession} from "../../_components/GeminiAi";
export async function POST(req: NextRequest){
    const {prompt} = await req.json();
    try{
        console.log(prompt)
        const result = await chatSession.sendMessage(prompt);
        const data = result.response.text();
        return NextResponse.json({data})
    }catch(e){
        console.log(e);
    }
}