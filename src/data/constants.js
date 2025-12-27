/**
 * Application-wide constants and static data
 */

export const TICKER_ITEMS = [
  '22G PROTEIN IN EVERY BAR',
  'NO PRESERVATIVES',
  'FULLY NATURAL INGREDIENTS',
  'GLUTEN FREE',
  'BUILT TO MUNCH'
]

export const PRODUCTS = [
  {
    id: 1,
    name: 'Peanut Rampage',
    description: 'Peanuts & Nut Protein Bar - 22g protein, fully natural',
    price: '$28',
    category: 'Protein Bar',
    badge: 'Best Seller',
    image: '/images/products/peanut-rampage.png',
    weight: '100gm',
    protein: '22g',
    color: '#FF1744', // Pink
    features: ['No Preservatives', 'No Artificial Sweeteners', 'Fully Natural', 'Gluten Free']
  },
  {
    id: 2,
    name: 'Berry Blastz',
    description: 'Berries & Nuts Protein Bar - 22g protein, antioxidant rich',
    price: '$28',
    category: 'Protein Bar',
    badge: 'New',
    image: '/images/products/berry-blastz.png',
    weight: '100gm',
    protein: '22g',
    color: '#C4D600', // Lime
    features: ['No Preservatives', 'No Artificial Sweeteners', 'Fully Natural', 'Gluten Free']
  },
  {
    id: 3,
    name: 'Choco Shatter',
    description: 'Chocolate & Badam Protein Bar - 22g protein, rich cocoa',
    price: '$30',
    category: 'Protein Bar',
    badge: 'Premium',
    image: '/images/products/choco-shatter.png',
    weight: '100gm',
    protein: '22g',
    color: '#FF1744', // Pink
    features: ['No Preservatives', 'No Artificial Sweeteners', 'Fully Natural', 'Omega-3']
  }
]

export const PROMOTIONS = [
  {
    id: 1,
    icon: 'fire',
    title: 'FLASH SALE',
    subtitle: 'Limited Time Offer',
    description: 'Get 25% off on all premium collections. Stock up on your favorite protein bars!',
    highlight: '25% OFF',
    cta: 'Shop Now',
    variant: 'hot',
    image: '/images/products/peanut-rampage.png',
    overlayText: 'NOW AVAILABLE',
    ambassadorName: 'Alex'
  },
  {
    id: 2,
    icon: 'gift',
    title: 'NEW CUSTOMER DEAL',
    subtitle: 'Welcome Bonus',
    description: 'First order gets 15% discount + free shipping. Start your protein journey today!',
    highlight: '15% + FREE SHIPPING',
    cta: 'Claim Offer',
    variant: 'welcome',
    image: '/images/products/berry-blastz.png',
    overlayText: 'NEW FLAVOR',
    ambassadorName: 'Sarah'
  },
  {
    id: 3,
    icon: 'tag',
    title: 'BUNDLE DEAL',
    subtitle: 'Best Value',
    description: 'Buy 3 products and save 30% on your order. Perfect for sharing with friends!',
    highlight: 'SAVE 30%',
    cta: 'View Bundles',
    variant: 'bundle',
    image: '/images/products/choco-shatter.png',
    overlayText: 'BUILT TO MUNCH',
    ambassadorName: 'Mike'
  },
  {
    id: 4,
    icon: 'star',
    title: 'PREMIUM COLLECTION',
    subtitle: 'Brand Highlight',
    description: 'Discover our premium protein bars with 22g protein and zero preservatives.',
    highlight: '22G PROTEIN',
    cta: 'Explore',
    variant: 'premium',
    image: '/images/products/peanut-rampage-front.png',
    overlayText: 'PREMIUM QUALITY',
    ambassadorName: 'Emma'
  },
  {
    id: 5,
    icon: 'truck',
    title: 'FREE SHIPPING',
    subtitle: 'On Orders Over $50',
    description: 'Get free shipping on orders over $50. Fast delivery straight to your door!',
    highlight: 'FREE DELIVERY',
    cta: 'Shop Now',
    variant: 'shipping',
    image: '/images/products/berry-blastz-back.png',
    overlayText: 'FREE SHIPPING',
    ambassadorName: 'Jordan'
  },
  {
    id: 6,
    icon: 'heart',
    title: 'NATURAL INGREDIENTS',
    subtitle: 'Our Promise',
    description: '100% natural ingredients, no preservatives, no artificial sweeteners. Built to munch!',
    highlight: '100% NATURAL',
    cta: 'Learn More',
    variant: 'natural',
    image: '/images/products/choco-shatter.png',
    overlayText: '100% NATURAL',
    ambassadorName: 'Taylor'
  }
]

export const DISCOUNT_TASKS = [
  {
    question: 'What makes CRUNCHME snacks special?',
    options: [
      'Simple ingredients',
      'Complex flavors',
      'Premium packaging',
      'All of the above'
    ],
    correct: 3
  },
  {
    question: 'How many products are in our collection?',
    options: ['3', '6', '9', '12'],
    correct: 1
  },
  {
    question: 'What is our brand philosophy?',
    options: [
      'Luxury first',
      'Elegant simplicity',
      'Maximum flavor',
      'Low prices'
    ],
    correct: 1
  }
]

export const SCRATCH_DISCOUNTS = [5, 10, 15, 20, 25, 30]

export const SCRATCH_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F'
]

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'crunchme-theme',
  SCRATCH_DISCOUNT: 'crunchme-scratch-discount',
  TASK_DISCOUNT: 'crunchme-discount'
}

// Animation delays
export const ANIMATION_DELAYS = {
  PRODUCT_CARD: 0.1,
  PROMO_ROTATION: 5000,
  PROMO_RESUME: 10000
}

