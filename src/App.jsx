import Header from './components/Header'
import Hero from './components/Hero'
import ScrollingTicker from './components/ScrollingTicker'
import JustDropped from './components/JustDropped'
import FeaturedProducts from './components/FeaturedProducts'
import Products from './components/Products'
import About from './components/About'
import PromotionBanner from './components/PromotionBanner'
import InteractiveFeatures from './components/InteractiveFeatures'
import Footer from './components/Footer'
import { TICKER_ITEMS } from './data/constants'
import './styles/base.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <ScrollingTicker items={TICKER_ITEMS} />
        <JustDropped />
        <FeaturedProducts />
        <Products />
        <PromotionBanner />
        <About />
        <InteractiveFeatures />
      </main>
      <Footer />
    </div>
  )
}

export default App
