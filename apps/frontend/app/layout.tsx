import type { Metadata } from "next"
import { Geist, Geist_Mono, Red_Hat_Display } from "next/font/google"
import "./globals.css"
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Synco",
  description:
    "Synco is an automation platform that links triggers and actions across apps, helping you build powerful workflows without complexity.",

  keywords: [
    "workflow automation",
    "webhook automation",
    "event driven system",
    "triggers and actions",
    "no code automation",
    "synco",
  ],

  authors: [{ name: "Sahil Shangloo" }],

  creator: "Sahil Shangloo",

  metadataBase: new URL("https://synco-rust.vercel.app/"),

  openGraph: {
    title: "Synco - Event Driven Automation",
    description:
      "Connect events to actions. Build reliable workflows using webhooks and structured execution.",
    url: "https://synco-rust.vercel.app/",
    siteName: "Synco",
    images: [
      {
        url: "https://synco-rust.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Synco Automation Platform Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Synco - Event Driven Automation",
    description:
      "Triggers in. Actions out. Build workflows without complexity.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${redHatDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <ToastProvider position="bottom-right">
          <AnchoredToastProvider>{children}</AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
