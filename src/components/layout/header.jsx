"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleLogin = () => {
    setIsLoggedIn(true)
    // In real app: Redirect to dashboard or set auth token
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    // In real app: Clear auth token and redirect
  }

  return (
    <header className="nav-glass shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              SNK
              <span className="text-primary-gold">RealEstate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-all relative group hover:text-primary-glow link-underline-delay"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors link-underline"
            >
              Login
            </Link>
            <Link
              href="/post-property"
              className="btn-primary text-white border-glow hover:shadow-xl transition-shadow duration-200 active:scale-[0.98]"
            >
              Post Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-foreground focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t nav-glass">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground font-medium"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/post-property"
                  className="btn-primary text-white"
                  onClick={toggleMenu}
                >
                  Post Property
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}