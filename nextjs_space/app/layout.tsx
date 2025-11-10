
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3010'),
  title: 'Bíblia Sagrada Almeida | Aplicativo de Leitura Bíblica',
  description: 'Leia a Bíblia Sagrada versão Almeida completa, marque versículos favoritos, faça anotações e acompanhe planos de leitura. Disponível como PWA para PC e celular.',
  keywords: ['Bíblia', 'Almeida', 'Leitura Bíblica', 'Versículos', 'Cristianismo', 'PWA'],
  authors: [{ name: 'Bíblia Almeida App' }],
  creator: 'Bíblia Almeida App',
  publisher: 'Bíblia Almeida App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Bíblia Sagrada Almeida | Aplicativo de Leitura Bíblica',
    description: 'Leia a Bíblia Sagrada versão Almeida completa, marque versículos favoritos, faça anotações e acompanhe planos de leitura. Disponível como PWA para PC e celular.',
    siteName: 'Bíblia Sagrada Almeida',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bíblia Sagrada Almeida - Aplicativo de Leitura Bíblica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bíblia Sagrada Almeida | Aplicativo de Leitura Bíblica',
    description: 'Leia a Bíblia Sagrada versão Almeida completa, marque versículos favoritos, faça anotações e acompanhe planos de leitura.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Bíblia Almeida',
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bíblia Almeida" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Bíblia Almeida" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
