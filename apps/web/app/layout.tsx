import "./app.css";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "freeflow",
  description: "A collaborative whiteboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <head></head>
        <body className="antialiased bg-unit-bg">
          {children}
          <Toaster theme="dark" richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
