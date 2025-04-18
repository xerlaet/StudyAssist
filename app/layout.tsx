import type { Metadata } from "next";
import { ClientLayout } from "@/components/client-layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "StudyBuddy",
  description: "",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>

          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
