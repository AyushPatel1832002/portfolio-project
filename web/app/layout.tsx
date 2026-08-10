import type {Metadata} from 'next'
import {Space_Grotesk, Inter, JetBrains_Mono} from 'next/font/google'
import './globals.css'
import {client} from '@/sanity/client'
import {siteSettingsQuery} from '@/sanity/queries'

const display = Space_Grotesk({subsets: ['latin'], variable: '--font-display', weight: ['500', '700']})
const body = Inter({subsets: ['latin'], variable: '--font-body'})
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-mono', weight: ['400', '500']})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  return {
    title: settings?.metaTitle || settings?.siteName || 'Portfolio',
    description: settings?.metaDescription || 'Developer portfolio built with Next.js and Sanity',
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
