const stats = [
  {
    number: '5000+',
    label: 'Properties Listed'
  },
  {
    number: '1200+',
    label: 'Happy Clients'
  },
  {
    number: '150+',
    label: 'Agents Network'
  },
  {
    number: '25',
    label: 'Cities Covered'
  }
]

const features = [
  {
    icon: '🏆',
    title: 'Verified Properties',
    description: 'All properties are thoroughly verified for authenticity and quality'
  },
  {
    icon: '🤝',
    title: 'Expert Agents',
    description: 'Connect with experienced real estate professionals'
  },
  {
    icon: '🔒',
    title: 'Secure Transactions',
    description: 'Safe and secure property buying and selling process'
  },
  {
    icon: '📱',
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your needs'
  },
  {
    icon: '📊',
    title: 'Market Insights',
    description: 'Get latest market trends and property valuations'
  },
  {
    icon: '🎯',
    title: 'Personalized Service',
    description: 'Tailored solutions based on your specific requirements'
  }
]

const testimonials = [
  {
    name: 'Rahul Sharma',
    company: 'Tech Solutions Inc.',
    role: 'CEO',
    content: 'SNK RealEstate helped us find the perfect office space in Mumbai. Their expertise and professionalism made the process seamless.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    company: 'Fashion Retail Ltd.',
    role: 'Business Owner',
    content: 'Excellent service! The team understood our requirements perfectly and found us the ideal retail location.',
    rating: 5
  },
  {
    name: 'Amit Kumar',
    company: 'Manufacturing Co.',
    role: 'Director',
    content: 'Great experience with SNK. They helped us secure a warehouse in Pune exactly as per our specifications.',
    rating: 4
  }
]

export default function WhyChooseSNK() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-gold">Choose SNK</span> RealEstate?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses across India for commercial property solutions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our <span className="text-gold">Clients Say</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}