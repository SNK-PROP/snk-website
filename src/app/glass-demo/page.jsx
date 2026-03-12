import { Button } from '@/components/ui/button'

export default function GlassDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Glass Morphism Effects</h1>

        {/* Basic Glass Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-1 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Glass Effect 1</h3>
            <p className="opacity-80">Basic glass morphism with subtle blur and transparency</p>
          </div>
          <div className="glass-2 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Glass Effect 2</h3>
            <p className="opacity-80">Enhanced glass effect with more blur and opacity</p>
          </div>
          <div className="glass-3 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Glass Effect 3</h3>
            <p className="opacity-80">Maximum glass effect with intense blur</p>
          </div>
        </div>

        {/* Glass Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Button variant="secondary" className="w-full py-4 text-white dark:text-white bg-black/30 dark:bg-white/10 border-white/20 hover:bg-white/20 dark:hover:bg-white/20">
            Glass Button
          </Button>
          <Button variant="outline" className="w-full py-4 text-white dark:text-white border-white/20 hover:bg-white/10 dark:hover:bg-white/10">
            Glass Outline
          </Button>
          <Button variant="default" className="w-full py-4 bg-primary-gold hover:bg-primary-gold/90 text-white">
            Gold Glass
          </Button>
        </div>

        {/* Card Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="property-card gradient-overlay">
            <div className="p-6">
              <div className="w-full h-40 bg-brand-gold/20 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Premium Office Space</h3>
              <p className="text-muted-foreground mb-4">Downtown location with panoramic views</p>
              <div className="flex justify-between items-center">
                <span className="text-primary-blue font-bold">₹2.5 Cr</span>
                <span className="text-sm text-muted-foreground">2000 sq ft</span>
              </div>
            </div>
          </div>

          <div className="property-card featured card-hover-lift">
            <div className="p-6">
              <div className="w-full h-40 bg-primary-blue/20 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Featured Retail Space</h3>
              <p className="text-muted-foreground mb-4">High street retail location</p>
              <div className="flex justify-between items-center">
                <span className="text-primary-gold font-bold">₹1.8 Cr</span>
                <span className="text-sm text-muted-foreground">1500 sq ft</span>
              </div>
            </div>
          </div>

          <div className="category-card glass-2">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Office Spaces</h3>
              <p className="text-muted-foreground">Commercial office properties</p>
            </div>
          </div>
        </div>

        {/* Navigation Demo */}
        <div className="nav-glass rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Glass Navigation</h2>
          <nav className="flex flex-wrap gap-4">
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">Properties</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">Services</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  )
}