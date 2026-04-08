import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DSAID · Digital Solutions for Africa\'s Integrated Development',
  description: 'Solar-powered mobile computer laboratories and sustainable technology initiatives empowering rural Kenya since 2007.',
  keywords: 'DSAID, digital education, solar labs, Kenya, technology, sustainability, e-waste recycling, rural development',
  authors: [{ name: 'DSAID Kenya' }],
  creator: 'DSAID Kenya',
  publisher: 'DSAID Kenya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dsaid.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DSAID - Digital Solutions for Africa\'s Integrated Development',
    description: 'Bridging the digital divide in rural Kenya through Solar Mobile Computer Labs, international curriculum training, and educational technology solutions.',
    url: 'https://dsaid.org',
    siteName: 'DSAID',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSAID - Digital Solutions for Africa\'s Integrated Development',
    description: 'Bridging the digital divide in rural Kenya through Solar Mobile Computer Labs, international curriculum training, and educational technology solutions.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
