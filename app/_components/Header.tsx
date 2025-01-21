"use client";
import Image from "next/image";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export default function Header() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div className="flex justify-between content-center p-3">
        <div className="flex justify-start">
          <Image src={"/logo.png"} alt="Logo" height={40} width={60} />
          <div className="p-3">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
        <div className="p-3">
            <Button onClick={()=>window.location.assign('https://www.instagram.com/premlakshaygodara')} variant={"secondary"}>Insta</Button>
        </div>
      </div>
    </>
  );
}
