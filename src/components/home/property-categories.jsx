const categories = [
  {
    id: 'commercial',
    title: 'Commercial Properties',
    description: 'Prime commercial spaces in bustling business districts',
    icon: '🏢',
    link: '#',
    color: 'from-blue-500 to-blue-600',
    features: 2500,
    growth: '+15%'
  },
  {
    id: 'office',
    title: 'Office Spaces',
    description: 'Modern offices for businesses of all sizes',
    icon: '👔',
    link: '#',
    color: 'from-indigo-500 to-indigo-600',
    features: 1800,
    growth: '+12%'
  },
  {
    id: 'retail',
    title: 'Retail Shops',
    description: 'High-visibility retail outlets and showrooms',
    icon: '🛍️',
    link: '#',
    color: 'from-purple-500 to-purple-600',
    features: 1200,
    growth: '+8%'
  },
  {
    id: 'industrial',
    title: 'Industrial/Land',
    description: 'Warehouses, factories and industrial plots',
    icon: '🏭',
    link: '#',
    color: 'from-green-500 to-green-600',
    features: 800,
    growth: '+10%'
  },
  {
    id: 'co-working',
    title: 'Co-working Spaces',
    description: 'Flexible workspaces for growing teams',
    icon: '💼',
    link: '#',
    color: 'from-yellow-500 to-yellow-600',
    features: 300,
    growth: '+25%'
  },
  {
    id: 'other',
    title: 'Other Commercial',
    description: 'Specialized commercial properties',
    icon: '🏬',
    link: '#',
    color: 'from-pink-500 to-pink-600',
    features: 400,
    growth: '+5%'
  }
]

export default function PropertyCategories() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-blue rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Browse by <span className="text-gold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
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
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Card content */}
              <div className="relative p-8">
                {/* Icon with animation */}
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {category.icon}
                  </div>
                </div>

                {/* Title and description */}
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{category.features}+</div>
                    <div className="text-xs text-gray-500">Properties</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{category.growth}</div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                </div>

                {/* Hover effect elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-lg font-semibold bg-black bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm">
                    Explore Now
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-1 -right-1 w-24 h-24 bg-gray-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gray-200 rounded-full opacity-30"></div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16 animate-slide-in-up animate-delay-400">
          <a
            href="#"
            className="inline-flex items-center bg-gradient-to-r from-primary-blue to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:translate-y-1"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-gold rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 bg-primary-blue rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}