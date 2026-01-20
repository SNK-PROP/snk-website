import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import HeroSection from '../components/home/hero-section'
import PropertyCategories from '../components/home/property-categories'
import FeaturedProperties from '../components/home/featured-properties'
import WhyChooseSNK from '../components/home/why-choose-snk'
import ContactCTA from '../components/home/contact-cta'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <PropertyCategories />
        <FeaturedProperties />
        <WhyChooseSNK />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}