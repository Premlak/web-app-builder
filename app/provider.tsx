"use client";
import * as React from "react";
import { ThemeProvider  } from "next-themes";
import {MessageContext, DeployContext} from "./_components/Context";
export default function Provider({children}: {children: any}){
    const [message, setMessage] = React.useState([]);
    const [deploy, setDeploy] = React.useState('');
    return (
        <>
        <MessageContext.Provider value={{message, setMessage}}>
        <DeployContext.Provider value={{deploy, setDeploy}}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </DeployContext.Provider>
        </MessageContext.Provider>
        </>
    )
}