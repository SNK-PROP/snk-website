import './styles.css'
import { ThemeProvider } from 'next-themes'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'SNK RealEstate - Premium Commercial Properties',
  description: 'Find the perfect commercial property for your business. Office spaces, retail shops, industrial properties, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} ${outfit.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}