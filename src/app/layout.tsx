import AppContextProvider from "@/contexts/app-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura",
  description: "Share Image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <AppContextProvider initialSessionToken={sessionToken?.value}>
          {children}
        </AppContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
