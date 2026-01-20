// Mock data for similar properties
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

export default function SimilarProperties({ currentPropertyId }) {
  const handleViewDetails = (propertyId) => {
    console.log('Viewing property:', propertyId)
    // In real app: router.push(`/property/${propertyId}`)
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
          {similarProperties.map((property) => (
            <div
              key={property.id}
              className="property-card card-hover cursor-pointer"
              onClick={() => handleViewDetails(property.id)}
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {property.featured && (
                    <span className="bg-gold text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {property.verified && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                    </svg>
                    <span>{property.area} • {property.pricePerSqft}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{property.type}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="property-price">{property.price}</span>
                  <button className="btn-primary text-white text-sm px-4 py-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center bg-primary-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}