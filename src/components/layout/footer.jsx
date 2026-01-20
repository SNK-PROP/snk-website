import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/services' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Careers', href: '/careers' }
    ],
    properties: [
      { name: 'Office Spaces', href: '/properties?type=office' },
      { name: 'Retail Shops', href: '/properties?type=retail' },
      { name: 'Industrial Properties', href: '/properties?type=industrial' },
      { name: 'Land & Plots', href: '/properties?type=land' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/snkrealestate' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/snkrealestate' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/snkrealestate' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/snkrealestate' }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              SNK
              <span className="text-gold">RealEstate</span>
            </div>
            <p className="mb-4 text-sm">
              Your trusted partner in commercial real estate. Find the perfect property for your business needs with our expert guidance and extensive property listings.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <span>contact@snkrealestate.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold">📍</span>
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Properties</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white mb-2">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gold transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <p>&copy; 2024 SNK RealEstate. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}