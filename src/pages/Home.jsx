import Hero from '../components/Hero'
import ScrollingTicker from '../components/ScrollingTicker'
import JustDropped from '../components/JustDropped'
import FeaturedProducts from '../components/FeaturedProducts'
import Products from '../components/Products'
import PromotionBanner from '../components/PromotionBanner'
import About from '../components/About'
import InteractiveFeatures from '../components/InteractiveFeatures'
import { TICKER_ITEMS } from '../data/constants'

function Home() {
  return (
    <>
      <Hero />
      <ScrollingTicker items={TICKER_ITEMS} />
      <JustDropped />
      <FeaturedProducts />
      <Products />
      <PromotionBanner />
      <About />
      <InteractiveFeatures />
    </>
  )
}

export default Home


