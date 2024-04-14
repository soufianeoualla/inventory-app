import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AddEditModalProvider } from "@/context/AddEditModalContext";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { NotificationProvider } from "@/context/NotificationContext";
import { TriggerProvider } from "@/context/TriggerContext";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TriggerProvider>
          <NotificationProvider>
            <EdgeStoreProvider>
              <AddEditModalProvider>{children}</AddEditModalProvider>
            </EdgeStoreProvider>
          </NotificationProvider>
        </TriggerProvider>
      </body>
    </html>
  );
}
