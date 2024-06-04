import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Inter } from 'next/font/google'
import { Toaster } from 'sonner';
import './globals.css'
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from '@/components/theme-provider';
import { SpeedInsights } from "@vercel/speed-insights/next"

import { PipProvider } from '@/components/stream-ui-components/pipContext';
import VideoPortal from '@/components/stream-ui-components/VideoPortal';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>

            <PipProvider>

              <Toaster theme="light" position="bottom-center" />
              {children}
              <VideoPortal /> 

            </PipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
