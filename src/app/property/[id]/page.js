"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchPropertyById, formatPrice } from '@/lib/data'

// Lazy load components
import PropertyHeader from '@/components/property/property-header'
import PropertyGallery from '@/components/property/property-gallery'
import PropertyDetails from '@/components/property/property-details'
import ContactForm from '@/components/property/contact-form'
import SimilarProperties from '@/components/property/similar-properties'

export default function PropertyPage() {
  const params = useParams()
  const propertyId = params.id

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProperty = async () => {
      if (!propertyId) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetchPropertyById(propertyId)
        setProperty(response)
      } catch (err) {
        console.error('Error fetching property:', err)
        setError('Failed to load property details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [propertyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-primary-blue font-semibold">SNK RealEstate</Link>
          </div>
        </div>

        {/* Loading Skeleton */}
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-primary-blue font-semibold">SNK RealEstate</Link>
          </div>
        </div>

        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? 'Error' : 'Property Not Found'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error || 'The property you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/properties"
                className="btn-primary text-white px-6 py-3 rounded-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/"
                className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Transform property data to match component expectations
  const transformedProperty = {
    ...property,
    location: property.location?.address || `${property.location?.city || ''}, ${property.location?.state || ''}`.trim(),
    type: property.propertyType || 'Commercial',
    price: formatPrice(property.price),
    pricePerSqft: property.price && property.area
      ? `₹${Math.round(property.price / property.area)}/sqft`
      : 'Contact for price',
    furnished: property.furnishing === 'furnished' || property.furnishing === 'semi-furnished',
    ownership: property.ownershipType || 'Freehold',
    builtUpArea: property.area ? `${property.area} ${property.areaUnit || 'sqft'}` : 'N/A',
    floorNumber: property.floorNumber || 'Ground Floor',
    totalFloors: property.totalFloors || 'N/A',
    facing: property.facing || 'N/A',
    possessionDate: property.possessionDate ? new Date(property.possessionDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Ready to Move',
    maintenance: property.maintenanceCharges ? `₹${property.maintenanceCharges}/month` : 'N/A',
    builder: property.builderName || property.developerName || 'N/A',
    yearOfConstruction: property.yearBuilt || property.constructionYear || 'N/A',
    amenities: property.amenities || [
      'Parking', 'Security', 'Power Backup', 'Water Supply',
      'Lift', 'Fire Safety', 'Intercom', 'CCTV'
    ],
    features: property.features || [
      'Prime Location', 'Spacious', 'Well Maintained',
      'Vastu Compliant', 'Corner Plot'
    ]
  }

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary-blue">Home</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/properties" className="text-gray-600 hover:text-primary-blue">Properties</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate max-w-xs">{transformedProperty.title}</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50">
        {/* Property Header */}
        <PropertyHeader property={transformedProperty} />

        {/* Property Gallery */}
        <PropertyGallery images={property.images || []} title={transformedProperty.title} />

        {/* Property Details & Contact Form */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyDetails property={transformedProperty} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <ContactForm
                  property={property}
                  agent={{
                    name: property.brokerName || property.createdBy?.name || 'SNK RealEstate Team',
                    phone: property.brokerContact || property.createdBy?.phone || '+91 98765 43210',
                    email: property.brokerEmail || property.createdBy?.email || 'info@snkrealestate.com',
                    company: property.brokerCompany || 'SNK RealEstate',
                    experience: `${property.brokerExperience || 5}+ years`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties currentPropertyId={property.id} />
      </main>
    </>
  )
}
