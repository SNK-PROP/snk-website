"use client"
import { useState, useEffect } from 'react'
import { Building, Building2, ShoppingCart, Factory, Briefcase, Store } from 'lucide-react'
import { brand, gradients } from '@/design/colors'

const categories = [
  {
    id: 'commercial',
    title: 'Commercial Properties',
    description: 'Prime commercial spaces in bustling business districts',
    icon: Building,
    link: '#',
    color: 'from-blue-500 to-blue-600',
    features: 2500,
    growth: '+15%'
  },
  {
    id: 'office',
    title: 'Office Spaces',
    description: 'Modern offices for businesses of all sizes',
    icon: Building2,
    link: '#',
    color: 'from-indigo-500 to-indigo-600',
    features: 1800,
    growth: '+12%'
  },
  {
    id: 'retail',
    title: 'Retail Shops',
    description: 'High-visibility retail outlets and showrooms',
    icon: ShoppingCart,
    link: '#',
    color: 'from-purple-500 to-purple-600',
    features: 1200,
    growth: '+8%'
  },
  {
    id: 'industrial',
    title: 'Industrial/Land',
    description: 'Warehouses, factories and industrial plots',
    icon: Factory,
    link: '#',
    color: 'from-green-500 to-green-600',
    features: 800,
    growth: '+10%'
  },
  {
    id: 'co-working',
    title: 'Co-working Spaces',
    description: 'Flexible workspaces for growing teams',
    icon: Briefcase,
    link: '#',
    color: 'from-yellow-500 to-yellow-600',
    features: 300,
    growth: '+25%'
  },
  {
    id: 'other',
    title: 'Other Commercial',
    description: 'Specialized commercial properties',
    icon: Store,
    link: '#',
    color: 'from-pink-500 to-pink-600',
    features: 400,
    growth: '+5%'
  }
]

export default function PropertyCategories() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse shimmer-loading w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto animate-pulse shimmer-loading w-2/3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg shimmer-loading animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Icon skeleton */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Title skeleton */}
                <div className="text-center mb-6">
                  <div className="h-8 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mx-auto w-3/4 animate-pulse"></div>
                </div>

                {/* Stats skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="h-6 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="h-6 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 brand.secondary rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 brand.primary rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Browse by <span className="brand.secondary bg-gradient-to-r from-brand-secondary to-yellow-400 bg-clip-text text-transparent">
              Property Type
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find exactly what you're looking for with our specialized property categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-3xl transform transition-all duration-500 hover:-translate-y-1 border border-gray-200 hover:brand.primary animate-fade-in-up card-enhanced"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              {/* Subtle gradient background for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-50"></div>

              {/* Card content */}
              <div className="relative p-8 z-10">
                {/* Icon with animation */}
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 hover:shadow-lg pulse-subtle relative z-10`}>
                    <category.icon className="h-10 w-10" />
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  </div>
                </div>

                {/* Title and description */}
                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:brand.primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="text-2xl font-bold brand.secondary group-hover:brand.secondary-light transition-colors duration-300">{category.features}+</div>
                    <div className="text-xs text-gray-500">Properties</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="text-2xl font-bold brand.gold[600] group-hover:brand.gold[700] transition-colors duration-300">{category.growth}</div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                </div>

                {/* Hover effect elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-lg font-semibold bg-black bg-opacity-30 px-8 py-4 rounded-full backdrop-blur-sm shadow-xl">
                    Explore Now
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary-blue/10 to-transparent rounded-full opacity-30"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-gold/10 to-transparent rounded-full opacity-20"></div>

                {/* Hover accent border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:brand.primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16 animate-slide-in-up animate-delay-400">
          <a
            href="#"
            className="inline-flex items-center bg-gradient-to-r from-brand-primary to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:translate-y-1"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-4 h-4 brand.secondary rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 brand.primary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}