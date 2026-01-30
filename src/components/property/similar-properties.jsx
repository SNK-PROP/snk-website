"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchSimilarProperties, formatPrice, getPropertyTypeIcon } from '@/lib/data'

export default function SimilarProperties({ currentPropertyId }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSimilarProperties = async () => {
      if (!currentPropertyId) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetchSimilarProperties(currentPropertyId)
        setProperties(response.properties || [])
      } catch (error) {
        console.error('Error loading similar properties:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    loadSimilarProperties()
  }, [currentPropertyId])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Similar <span className="text-gold">Properties</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return null // Don't show section if no similar properties
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Similar <span className="text-gold">Properties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore other properties that might interest you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="property-card card-hover"
            >
              {/* Property Image */}
              <div className="relative overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="property-image w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-4xl">{getPropertyTypeIcon(property.propertyType)}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  {property.isFeatured && (
                    <span className="bg-gold text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                </div>
                {/* Transaction Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-blue text-white text-xs px-2 py-1 rounded-full capitalize">
                    {property.transactionType || 'Sale'}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <span className="text-lg">{getPropertyTypeIcon(property.propertyType)}</span>
                  <span className="capitalize">{property.propertyType || 'Commercial'}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {property.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">
                      {property.location?.city || 'City'}, {property.location?.state || 'State'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                    </svg>
                    <span>{property.area || 0} {property.areaUnit || 'sqft'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="property-price text-lg font-bold text-primary-blue">
                    {formatPrice(property.price)}
                  </span>
                  <span className="text-sm text-primary-blue font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center bg-primary-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
