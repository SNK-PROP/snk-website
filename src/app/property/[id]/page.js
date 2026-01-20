"use client"
import { notFound } from 'next/navigation'
import { fetchPropertyById } from '../../../lib/data'
import Header from '../../../components/layout/header'
import Footer from '../../../components/layout/footer'
import PropertyHeader from '../../../components/property/property-header'
import PropertyGallery from '../../../components/property/property-gallery'
import PropertyDetails from '../../../components/property/property-details'
import ContactForm from '../../../components/property/contact-form'
import SimilarProperties from '../../../components/property/similar-properties'

export default async function PropertyPage({ params }) {
  let property
  let loading = false
  let error = null

  try {
    property = await fetchPropertyById(params.id)
    if (!property) {
      notFound()
    }
  } catch (err) {
    console.error('Error fetching property:', err)
    error = 'Failed to load property details'
  }

  // Mock similar properties
  const similarProperties = [
    {
      id: 2,
      title: 'Premium Office Space in CBD',
      price: '₹2,50,000',
      pricePerSqft: '₹350/sqft',
      location: 'Mumbai, Maharashtra',
      type: 'Office Space',
      area: '7,200 sqft',
      furnished: true,
      featured: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Retail Shop on Main Road',
      price: '₹1,20,000',
      pricePerSqft: '₹400/sqft',
      location: 'Bangalore, Karnataka',
      type: 'Retail Shop',
      area: '3,000 sqft',
      furnished: true,
      featured: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Warehouse in Industrial Area',
      price: '₹3,00,000',
      pricePerSqft: '₹280/sqft',
      location: 'Pune, Maharashtra',
      type: 'Industrial',
      area: '10,714 sqft',
      furnished: false,
      featured: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1581093198642-53a61e8349bc?w=400&h=300&fit=crop'
    }
  ]

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary text-white px-6 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary text-white px-6 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <PropertyHeader property={property} />
        <PropertyGallery images={property.images || []} />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyDetails property={property} />
            </div>
            <div className="lg:col-span-1">
              <ContactForm
                property={property}
                agent={property.brokerId || { name: property.brokerName || 'SNK Team' }}
              />
            </div>
          </div>
        </div>
        <SimilarProperties currentPropertyId={property.id} />
      </main>
      <Footer />
    </>
  )
}