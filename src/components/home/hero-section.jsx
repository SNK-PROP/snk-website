"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { brand, opacity } from '@/design/colors'

export default function HeroSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    transactionType: '',
    minPrice: '',
    maxPrice: ''
  })
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate async operation
    setTimeout(() => {
      // Build query parameters
      const params = new URLSearchParams()
      if (searchData.location) params.append('location', searchData.location)
      if (searchData.propertyType) params.append('propertyType', searchData.propertyType)
      if (searchData.transactionType) params.append('transactionType', searchData.transactionType)
      if (searchData.minPrice) params.append('minPrice', searchData.minPrice)
      if (searchData.maxPrice) params.append('maxPrice', searchData.maxPrice)

      // Navigate to properties page
      router.push(`/properties?${params.toString()}`)
      setIsSearching(false)
    }, 1000)
  }

  const handleQuickSearch = (location) => {
    router.push(`/properties?location=${encodeURIComponent(location)}`)
  }

  const [particles] = useState(() =>
  Array.from({ length: 20 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    type: Math.floor(Math.random() * 3)
  }))
)

  const propertyTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'land', label: 'Land/Plot' }
  ]

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${brand.primary} 0%, ${brand.secondary} 100%)`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl animate-float-slow"
             style={{ backgroundColor: opacity.brand.gold[30] }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl animate-float"
             style={{ backgroundColor: brand.gold[300], animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full filter blur-3xl animate-float-slow"
             style={{ backgroundColor: brand.blue[400], animationDelay: '2s' }}></div>
      </div>

      {/* Decorative building silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gray-900 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 L0,100 L100,80 L200,120 L300,90 L400,110 L500,70 L600,100 L700,60 L800,90 L900,50 L1000,80 L1100,40 L1200,70 L1200,200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none">
  {particles.map((p, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-white opacity-30 rounded-full"
      style={{
        top: `${p.top}%`,
        left: `${p.left}%`,
        animation:
          p.type === 0
            ? "pulse 3s ease-in-out infinite"
            : p.type === 1
            ? "float 6s ease-in-out infinite"
            : "pulse 4s ease-in-out infinite",
        animationDelay: `${p.delay}s`
      }}
    />
  ))}
</div>
      </div>

      <div className="relative container mx-auto px-4 pt-20 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left Content - Animated */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 animate-slide-in-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-gold-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-semibold">India's Leading Commercial Real Estate Platform</span>
              </div>
              <h1 className="display-1 text-display mb-6 text-white">
                Find Your Perfect<br />
                <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                  Commercial Property
                </span>
              </h1>
              <p className="body-1 text-white/85 max-w-2xl">
                Discover premium office spaces, retail shops, and industrial properties across India's most business-friendly cities
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push('/properties')}
                  className="group w-full sm:w-auto items-center justify-center gap-2 animation-duration-200 hover:shadow-xl active:scale-[0.95] text-white"
                  variant="default"
                >
                  <span>Explore Properties</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 animate-once" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button
                  onClick={() => router.push('/contact')}
                  className="w-full sm:w-auto justify-center animation-duration-200 hover:shadow-lg active:scale-[0.95] border-white/40 text-white hover:bg-white/15 hover:text-white"
                  variant="outline"
                >
                  Free Property Valuation
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 glass-strong rounded-xl p-4 sm:p-6">
              <div className="text-center">
                <div className="stats-1 text-gold-200">5000+</div>
                <div className="text-xs sm:text-sm text-white/80">Properties</div>
              </div>
              <div className="text-center sm:border-x border-white border-opacity-20">
                <div className="stats-1 text-gold-200">1200+</div>
                <div className="text-xs sm:text-sm text-white/80">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="stats-1 text-gold-200">25+</div>
                <div className="text-xs sm:text-sm text-white/80">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Search Box */}
          <div className="lg:w-1/2 animate-slide-in-right">
            <div className="relative">
              {/* Floating badge */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-primary-gold text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10">
                Instant Results
              </div>

              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:shadow-3xl gradient-overlay card-hover-lift">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <h3 className="heading-3 text-gray-900">Search Properties</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter city, area, or landmark"
                            value={searchData.location}
                            onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                            className="pl-10 hover:shadow-md focus:shadow-lg text-gray-900 placeholder:text-gray-400 border-gray-300"
                            required
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Type
                          </label>
                          <Select value={searchData.propertyType} onValueChange={(value) => setSearchData({...searchData, propertyType: value})}>
                            <SelectTrigger className="select-enhanced text-gray-900 border-gray-300 bg-white data-[placeholder]:text-gray-500">
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-900 border-gray-200 shadow-lg">
                              {propertyTypes.map(type => (
                                <SelectItem key={type.value} value={type.value} className="text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction Type
                          </label>
                          <Select value={searchData.transactionType} onValueChange={(value) => setSearchData({...searchData, transactionType: value})}>
                            <SelectTrigger className="select-enhanced text-gray-900 border-gray-300 bg-white data-[placeholder]:text-gray-500">
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-900 border-gray-200 shadow-lg">
                              <SelectItem value="all" className="text-gray-900 focus:bg-gray-100 focus:text-gray-900">All Types</SelectItem>
                              <SelectItem value="sale" className="text-gray-900 focus:bg-gray-100 focus:text-gray-900">For Sale</SelectItem>
                              <SelectItem value="rent" className="text-gray-900 focus:bg-gray-100 focus:text-gray-900">For Rent</SelectItem>
                              <SelectItem value="lease" className="text-gray-900 focus:bg-gray-100 focus:text-gray-900">For Lease</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min. Price (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-mono">₹</span>
                            <Input
                              type="number"
                              placeholder="0"
                              value={searchData.minPrice}
                              onChange={(e) => setSearchData({...searchData, minPrice: e.target.value})}
                              className="pl-8 font-mono text-gray-900 placeholder:text-gray-400 border-gray-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max. Price (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-mono">₹</span>
                            <Input
                              type="number"
                              placeholder="No limit"
                              value={searchData.maxPrice}
                              onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                              className="pl-8 font-mono text-gray-900 placeholder:text-gray-400 border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full items-center justify-center gap-2 btn-ripple"
                    variant="default"
                    size="lg"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <div className="spinner spinner-primary"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Properties
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleQuickSearch('Mumbai')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-200 hover:scale-105"
                    >
                      Mumbai
                    </Button>
                    <Button
                      onClick={() => handleQuickSearch('Delhi')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-200 hover:scale-105"
                    >
                      Delhi
                    </Button>
                    <Button
                      onClick={() => handleQuickSearch('Bangalore')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-200 hover:scale-105"
                    >
                      Bangalore
                    </Button>
                    <Button
                      onClick={() => handleQuickSearch('Hyderabad')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-200 hover:scale-105"
                    >
                      Hyderabad
                    </Button>
                    <Button
                      onClick={() => handleQuickSearch('Chennai')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-200 hover:scale-105"
                    >
                      Chennai
                    </Button>
                    <Button
                      onClick={() => router.push('/properties')}
                      variant="link"
                      size="sm"
                      className="link-gradient font-semibold"
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
