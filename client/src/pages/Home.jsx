import React from 'react'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import StatsPreview from '../components/landing/StatsPreview'
import HowItWorks from '../components/landing/HowItWorks'
import WhyItMatters from '../components/landing/WhyItMatters'

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <StatsPreview />
      <HowItWorks />
      <WhyItMatters />
    </div>
  )
}

export default Home