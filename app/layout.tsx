import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import Header from "./_components/Header";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Web App Generator",
  description: "Genrate the entire web on just a command",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Toaster />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
