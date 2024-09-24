import type { Metadata } from "next"
import { AppProvider } from "@/provider"

export const metadata: Metadata = {
  title: "Next Auth SNS",
  description: "Next Auth SNS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
