const categories = [
  {
    id: 'commercial',
    title: 'Commercial Properties',
    description: 'Prime commercial spaces in bustling business districts',
    icon: '🏢',
    link: '#'
  },
  {
    id: 'office',
    title: 'Office Spaces',
    description: 'Modern offices for businesses of all sizes',
    icon: '👔',
    link: '#'
  },
  {
    id: 'retail',
    title: 'Retail Shops',
    description: 'High-visibility retail outlets and showrooms',
    icon: '🛍️',
    link: '#'
  },
  {
    id: 'industrial',
    title: 'Industrial/Land',
    description: 'Warehouses, factories and industrial plots',
    icon: '🏭',
    link: '#'
  },
  {
    id: 'co-working',
    title: 'Co-working Spaces',
    description: 'Flexible workspaces for growing teams',
    icon: '💼',
    link: '#'
  },
  {
    id: 'other',
    title: 'Other Commercial',
    description: 'Specialized commercial properties',
    icon: '🏬',
    link: '#'
  }
]

export default function PropertyCategories() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="text-gold">Property Type</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for with our specialized property categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="category-card block"
            >
              <div className="category-icon mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center text-primary-blue font-semibold hover:text-blue-700 transition-colors"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}