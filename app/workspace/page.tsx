"use client";
const AIPROMPT = `Generate a  Vite Project. Follow these guidelines to create an organized structure:

Project Structure Requirements:
1. Include multiple components and organize them properly in relevant folders.
2. /App.js is The starting Point of the app. So firstly change this file according to flow
3. Include Tailwind CSS setup for styling.
4. Provide configuration files for Vite and Tailwind CSS.
5. The 'public' folder should contain an 'index.html' file.
6. Remeber that /App.js is the root level or starting level of the app.
7. The App.js is the starting point of the project and the App.js exists in Root level of vite

Return the response in valid JSON format with the following schema:

{
  "projectTitle": "Project Title Here",
  "explanation": "Brief explanation of the project.",
  "files": {
  },
  "packages": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "or any other required pacakge": "version or it or latest"
  },
  "generatedFiles": [
    "/public/index.html",
    "/tailwind.config.js",
    "/or ay other required file"
  ]
}
Ensure the JSON response follows the provided schema accurately without additional explanations.  
Provide only the JSON object without introductory text or descriptions.`;
import * as React from "react";
import { MessageContext } from "../_components/Context";
import { Progress } from "@/components/ui/progress";
import { UserIcon, ComputerIcon, ArrowBigRight } from "lucide-react";
import SandBoxPreviewProvider from "../_components/PreviewProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { DeployContext } from "../_components/Context";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function Home() {
  const { message, setMessage } = React.useContext(MessageContext);
  const [dep, setDep] = React.useState<{ [key: string]: string }>({});
  const [input, setInput] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [cross, setCross] = React.useState(false);
  const { theme } = useTheme();
  const {deploy} = React.useContext(DeployContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("code");
  const [packageName, setPackageName]: any = React.useState({});
  const [uFiles, setUFiles]: any = React.useState({});
  const [filePath, setFilePath] = React.useState("");
  const [files, setFiles] = React.useState({
    "/public/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`,
    },
    "/App.css": {
      code: `@tailwind base;
  @tailwind components;
  @tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };`,
    },
    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: {
      tailwindcss: {},
    },
  };
  export default config;`,
    },
  });
  const GenAiCode = async() => {
    setProgress(50);
    const prompt = JSON.stringify(message) + AIPROMPT;
    const req = await axios.post('/api/code', {prompt}); 
    const mergedFiles =  {...files, ...req.data?.files};
    setFiles(mergedFiles);
    setProgress(85);
    const mergedPackages = {...dep, ...req.data?.packages}
    setDep(mergedPackages);
    setProgress(100);
  }
  const genrateResponse = async () => {
    setProgress(10);
    toast("Genration Started");
    const prompt = `${input} You are a AI Assistant and experience in Vite Development. GUIDELINES 1.Tell user what your are building 2.response less than 15 lines.. 3.Skip code examples and commentary`;
    const req = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await req.json();
    setMessage((prevMessages: any) => [
      ...prevMessages,
      { con: data.data, role: "ai" },
    ]);
    setInput("");
    setProgress(50)
  };
  React.useEffect(() => {
    if (message.length > 0) {
      setInput(message[message.length - 1].con);
      genrateResponse();
    }
  }, []);
  React.useEffect(()=>{
    if(message[message.length - 1]?.role == "user"){
      GenAiCode();
    }
  },[message]);
  return (
    <div className="h-screen flex flex-row justify-between scrollbar-hide max-sm:grid max-sm:grid-cols-1">
      <div
        className="w-1/5 sm:max-h-300px max-sm:w-full h-auto flex flex-col scrollbar-hide border-r-2 border-teal-400 dark:border-gray-800"
        id="chat"
      >
        <div
          className="overflow-y-auto outline-none h-3/5 scrollbar-hide"
          style={{ scrollbarGutter: "none" }}
        >
          {message.map((mes: any, ind: any) => (
            <div key={ind} className="mt-3 p-2">
              {mes.role === "user" ? (
                <span>
                  <UserIcon className="m-1 ml-3"></UserIcon>
                  <p className="p-3">{mes.con}</p>
                </span>
              ) : (
                <span>
                  <ComputerIcon className="ml-3"></ComputerIcon>
                  <p className="p-3">{mes.con}</p>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 border-separate mt-3 border-t-2 border-teal-400 dark:border-gray-800">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=" Anything Missing Or Wrong Just Type Here"
            className="outline-none overflow-hidden bg-transparent w-full h-32 max-h-56 pt-3 p-1"
          />
          <div className="mt-2">
            {input != "" && (
              <Button
                onClick={() => {
                  setMessage((prevMessages: any) => [
                    ...prevMessages,
                    { con: input, role: "user" },
                  ]);
                  genrateResponse();
                }}
                variant={"secondary"}
              >
                <ArrowBigRight className="m-3"></ArrowBigRight>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div id="code" className="flex w-4/5 max-sm:w-full max-sm:-mt-20">
        <div className="min-w-full">
          <div className="w-full mb-5 border border-teal-400 dark:border-gray-800 max-sm:pt-2">
            <Button
              variant={"ghost"}
              className={`ml-2 max-sm:hidden ${cross ? "bg-red-500" : "bg-green-500"}`}
              onClick={() => {
                setCross(!cross);
              }}
            >
              {cross ? <>Disable Cross Mode</> : <>Enable Cross Mode</>}
            </Button>
            {!cross && (
              <>
                <Button
                  className="ml-1"
                  onClick={() => {
                    if (activeTab === "code") {
                      setActiveTab("pre");
                    } else {
                      setActiveTab("code");
                    }
                  }}
                >
                  {activeTab === "code" ? <>View</> : <>Code</>}
                </Button>
              </>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="m-2">
                  Manage Packages
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Package Manager</DialogTitle>
                  <DialogDescription>
                    Be sure you are entering the correct package name and its
                    version.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Correct Name Of Package"
                      value={packageName.name || ""}
                      onChange={(e) =>
                        setPackageName((prev: any) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="version" className="text-right">
                      Version
                    </Label>
                    <Input
                      id="version"
                      placeholder="Correct Version Or Type Latest"
                      value={packageName.version || ""}
                      onChange={(e) =>
                        setPackageName((prev: any) => ({
                          ...prev,
                          version: e.target.value,
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (packageName.name && packageName.version) {
                        setDep((prevDep) => ({
                          ...prevDep,
                          [packageName.name]: packageName.version,
                        }));
                        setPackageName({ name: "", version: "" });
                        toast("Added");
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-4">
                  {Object.entries(dep).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span>{`${key}: @${value}`}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setDep((prevDep) => {
                            const newDep = { ...prevDep };
                            delete newDep[key];
                            toast("Removed");
                            return newDep;
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="m-1">
                  Manage Files
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>File Manager</DialogTitle>
                  <DialogDescription>
                    Enter the full path of the file with extension.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="filePath" className="text-right">
                      File Path
                    </Label>
                    <Input
                      id="filePath"
                      placeholder="/path/to/file.txt"
                      value={filePath}
                      onChange={(e) => setFilePath(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (filePath.trim()) {
                        setUFiles((prevFiles: any) => ({
                          ...prevFiles,
                          [filePath]: { code: "" },
                        }));
                        setFiles((prevFiles) => ({
                          ...prevFiles,
                          [filePath]: { code: "" },
                        }));
                        setFilePath("");
                        toast("File added");
                      }
                    }}
                  >
                    Add File
                  </Button>
                </div>
                <div className="mt-4">
                  <Label>Ai & User Genrated Files</Label>
                  {Object.entries(files).map(([key]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span>{key}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setFiles((prevFiles: any) => {
                            const newFiles = { ...prevFiles };
                            delete newFiles[key];
                            return newFiles;
                          });
                          setFiles((prevFiles: any) => {
                            const newFiles = { ...prevFiles };
                            delete newFiles[key];
                            return newFiles;
                          });
                          toast("File removed");
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button className="ml-2 max-sm:mb-2" onClick={()=>{if(deploy != ""){router.push(deploy);}else{message("Stay On View Or Cross Mode Then Wait")}}}>Deploy</Button>
            <Progress value={progress}/>
          </div>
          <SandpackProvider
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
            files={files}
            template="react"
            theme={`${theme === "dark" ? "dark" : "light"}`}
            customSetup={{
              dependencies: {
                ...dep,
              },
            }}
          >
            <SandpackLayout>
              {cross ? (
                <>
                  <SandpackFileExplorer style={{ height: "80vh" }} />
                  <SandpackCodeEditor
                    style={{ height: "80vh" }}
                    className="scrollbar-hide"
                  />
                  <SandBoxPreviewProvider />
                </>
              ) : (
                <>
                  {activeTab === "code" ? (
                    <>
                      <SandpackFileExplorer style={{ height: "80vh" }} />
                      <SandpackCodeEditor 
                      showInlineErrors={true}
                      showLineNumbers={true}
                      showRunButton={true}
                        style={{ height: "80vh" }}
                        className="scrollbar-hide"
                      />
                    </>
                  ) : (
                    <>
                      <SandBoxPreviewProvider />
                    </>
                  )}
                </>
              )}
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
}
