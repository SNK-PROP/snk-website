import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SNK RealEstate - Premium Commercial Properties',
  description: 'Find the perfect commercial property for your business. Office spaces, retail shops, industrial properties, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}