"use client"

import { useEffect, useState } from 'react'
import { fetchPublicStatistics } from '@/lib/data'
import { Trophy, Handshake, Shield, Phone, BarChart, Target, Users, MapPin, Building, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { brand } from '@/design/colors'

const features = [
  {
    icon: Trophy,
    title: 'Verified Properties',
    description: 'All properties are thoroughly verified for authenticity and quality',
    iconColor: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Handshake,
    title: 'Expert Agents',
    description: 'Connect with experienced real estate professionals',
    iconColor: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Safe and secure property buying and selling process',
    iconColor: 'from-green-500 to-emerald-500'
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your needs',
    iconColor: 'from-purple-500 to-pink-500'
  },
  {
    icon: BarChart,
    title: 'Market Insights',
    description: 'Get latest market trends and property valuations',
    iconColor: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'Personalized Service',
    description: 'Tailored solutions based on your specific requirements',
    iconColor: 'from-orange-500 to-red-500'
  }
]

const testimonials = [
  {
    name: 'Rahul Sharma',
    company: 'Tech Solutions Inc.',
    role: 'CEO',
    content: 'SNK RealEstate helped us find the perfect office space in Mumbai. Their expertise and professionalism made the process seamless. The entire team was responsive and knowledgeable.',
    rating: 5,
    avatar: 'RS'
  },
  {
    name: 'Priya Patel',
    company: 'Fashion Retail Ltd.',
    role: 'Business Owner',
    content: 'Excellent service! The team understood our requirements perfectly and found us the ideal retail location. Highly recommend their services.',
    rating: 5,
    avatar: 'PP'
  },
  {
    name: 'Amit Kumar',
    company: 'Manufacturing Co.',
    role: 'Director',
    content: 'Great experience with SNK. They helped us secure a warehouse in Pune exactly as per our specifications. Very professional team.',
    rating: 4,
    avatar: 'AK'
  }
]

// Fallback stats in case API fails
const fallbackStats = [
  {
    number: '5000+',
    label: 'Properties Listed',
    icon: Building,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '1200+',
    label: 'Happy Clients',
    icon: Smile,
    color: 'from-green-500 to-green-600'
  },
  {
    number: '150+',
    label: 'Agents Network',
    icon: Users,
    color: 'from-brand-secondary to-yellow-500'
  },
  {
    number: '25',
    label: 'Cities Covered',
    icon: MapPin,
    color: 'from-purple-500 to-purple-600'
  }
]

// Animated stat counter component
function StatCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let startValue = 0
    const endValue = parseInt(end.replace(/[^0-9]/g, '')) || 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}{end.includes('+') && '+'}
    </span>
  )
}

export default function WhyChooseSNK() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchPublicStatistics()

        // Transform API data to stats format
        const apiStats = [
          {
            number: response.totalProperties?.toLocaleString() + '+',
            label: 'Properties Listed',
            icon: Building,
            color: 'from-blue-500 to-blue-600'
          },
          {
            number: Math.floor(response.totalProperties * 0.25).toLocaleString() + '+',
            label: 'Happy Clients',
            icon: Smile,
            color: 'from-green-500 to-green-600'
          },
          {
            number: response.totalBrokers?.toLocaleString() + '+',
            label: 'Agents Network',
            icon: Users,
            color: 'from-brand-secondary to-yellow-500'
          },
          {
            number: response.totalCities?.toString() || '25',
            label: 'Cities Covered',
            icon: MapPin,
            color: 'from-purple-500 to-purple-600'
          }
        ]

        setStats(apiStats)
      } catch (error) {
        console.error('Error loading stats:', error)
        setStats(fallbackStats)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const displayStats = stats || fallbackStats

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 brand.primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 brand.secondary rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-20 animate-slide-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why <span className="brand.secondary bg-gradient-to-r from-brand-secondary to-yellow-400 bg-clip-text text-transparent">
              Choose SNK
            </span> RealEstate?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by businesses across India for premium commercial property solutions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {displayStats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative inline-block">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl`}>
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 brand.secondary rounded-full animate-ping"></div>
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent mb-2">
                {!loading && <StatCounter end={stat.number} />}
                {loading && stat.number}
              </div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100 p-8"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.iconColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-4xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <feature.icon className="h-12 w-12" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 brand.primary rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-16 animate-slide-in-up animate-delay-400">
            What Our <span className="brand.secondary bg-gradient-to-r from-brand-secondary to-yellow-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-4 p-8 overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>

                {/* Avatar */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 transform transition-transform duration-300 group-hover:scale-110">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs brand.secondary font-semibold">{testimonial.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
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

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed italic mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 brand.secondary opacity-20">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 animate-slide-in-up animate-delay-800">
          <div className="bg-gradient-to-r from-brand-primary to-blue-700 text-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the SNK Difference?
            </h3>
            <p className="text-blue-100 mb-6">
              Join thousands of satisfied clients who have found their perfect commercial properties with us.
            </p>
            <Button variant="default" className="brand.primary px-8 py-4 transform hover:scale-105">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
