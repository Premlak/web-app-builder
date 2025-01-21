import * as React from "react";
import { ArrowBigRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageContext } from "./Context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Main(){
    const router = useRouter();
    const [input, setInput] = React.useState('');
    const {setMessage} = React.useContext(MessageContext);
    const onGenrate = (input: any) => {
        setMessage((prevMessages: any) => [...prevMessages, {con: input, role: 'user'}]);
        toast("Wait While Redirecting");
        router.push('/workspace');
    }
    const suggestions = ["Build A Todo List App", "Build A Calculator App", "Build A Weather App", "Build A Recipe Finder App", "Build A Expense Tracker App", "Build A Habit Tracker App"];
    return (
        <>
            <div className="flex flex-col items-center mt-36 max-sm:mt-20">
                <h1 className="text-3xl">What you want to Build</h1>
                <div className="p-5 border rounded-xl max-w-xl w-full mt-3">
                <div className="flex gap-3">
                    <textarea onChange={(e)=>setInput(e.target.value)} placeholder="Web App You Are Thinking To Build" className="outline-none overflow-hidden bg-transparent w-full h-32 max-h-56"/>
                        {input != "" && (
                            <Button onClick={()=>{onGenrate(input)}} variant={"secondary"}><ArrowBigRight></ArrowBigRight></Button>
                        )}
                </div>
                <div>
                    <Link className="h-5 w-5"></Link>
                </div>
                </div>
                <div className="flex flex-wrap max-w-2xl items-center justify-center mt-3">
                    {suggestions.map((sug, index) =>(
                        <h4 onClick={()=>{onGenrate(sug)}} key={index} className="p-1 px-2 m-1 border rounded-full text-xs hover:bg-teal-300 hover:text-gray-800 cursor-pointer">{sug}</h4>
                    ))}
                </div>
            </div>
        </>
    )
}