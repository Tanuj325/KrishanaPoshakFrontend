const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`

const POSHAK_SIZES = ['No. 0', 'No. 1', 'No. 2', 'No. 3', 'No. 4', 'No. 5']

const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1610030469668-8e9f43c8e42b?auto=format&fit=crop&w=900&q=85',
]

function getImages(index) {
  return [
    IMAGE_POOL[index % IMAGE_POOL.length],
    IMAGE_POOL[(index + 1) % IMAGE_POOL.length],
    IMAGE_POOL[(index + 2) % IMAGE_POOL.length],
    IMAGE_POOL[(index + 3) % IMAGE_POOL.length],
  ]
}

function createPoshak({
  id,
  name,
  priceValue,
  discountPercent = 0,
  description,
  category,
  images,
  sizes = POSHAK_SIZES,
  stock,
  rating,
  badge,
  material = 'Silk blend fabric, zari lace, pearl accents, soft lining',
}) {
  const hasDiscount = discountPercent > 0
  const originalPrice = hasDiscount
    ? Math.round(priceValue / (1 - discountPercent / 100))
    : null

  return {
    id,
    name,
    price: formatPrice(priceValue),
    priceValue,
    discount: hasDiscount ? `${discountPercent}% Off` : null,
    oldPrice: originalPrice ? formatPrice(originalPrice) : null,
    description,
    category,
    images,
    image: images[0],
    gallery: images,
    sizes,
    stock,
    rating: Number(rating).toFixed(1),
    inStock: stock > 0,
    stockStatus:
      stock === 0 ? 'Out of Stock' : stock <= 5 ? `Only ${stock} Left` : 'In Stock',
    badge,
    material,
  }
}

const poshakCatalog = [
  {
    name: 'Peacock Zari Krishna Poshak',
    priceValue: 1499,
    discountPercent: 25,
    category: 'Laddu Gopal Poshak',
    stock: 24,
    rating: 4.9,
    badge: 'Featured',
    description:
      'A majestic peacock-inspired poshak with rich zari borders and pearl detailing, perfect for daily darshan and festive seva.',
  },
  {
    name: 'Makhan Chor Silk Poshak',
    priceValue: 1099,
    discountPercent: 20,
    category: 'Daily Seva Poshak',
    stock: 18,
    rating: 4.8,
    badge: 'Best Seller',
    description:
      'Soft butter-yellow silk set inspired by Makhan Chor leela, finished with delicate gota work for everyday mandir dressing.',
  },
  {
    name: 'Vrindavan Blossom Poshak',
    priceValue: 1299,
    discountPercent: 15,
    category: 'Laddu Gopal Poshak',
    stock: 30,
    rating: 4.7,
    badge: 'New',
    description:
      'Floral motifs in pastel tones celebrate Vrindavan gardens, with breathable fabric ideal for warm-weather seva.',
  },
  {
    name: 'Janmashtami Midnight Blue Set',
    priceValue: 1899,
    discountPercent: 22,
    category: 'Janmashtami Collection',
    stock: 12,
    rating: 5.0,
    badge: 'Festival Pick',
    description:
      'Deep midnight blue velvet poshak with silver zari stars, crafted specially for Janmashtami night celebrations.',
  },
  {
    name: 'Radha Rani Pink Zari Poshak',
    priceValue: 1599,
    discountPercent: 18,
    category: 'Festival Poshak',
    stock: 20,
    rating: 4.9,
    badge: 'Premium',
    description:
      'Rose-pink silk with golden zari patterns echoing Radha Rani grace, ideal for coupled deity styling and festivals.',
  },
  {
    name: 'Govardhan Hill Green Poshak',
    priceValue: 1199,
    discountPercent: 10,
    category: 'Daily Seva Poshak',
    stock: 28,
    rating: 4.6,
    description:
      'Earthy green tones with subtle leaf embroidery honour Govardhan leela, offering a serene look for morning puja.',
  },
  {
    name: 'Yamuna Pearl Border Poshak',
    priceValue: 1399,
    discountPercent: 12,
    category: 'Premium Zari Poshak',
    stock: 16,
    rating: 4.8,
    badge: 'Elegant',
    description:
      'Cool aqua silk with pearl-bordered dupatta styling, reminiscent of Yamuna waters and Vrindavan evenings.',
  },
  {
    name: 'Nanda Mahotsav Gold Set',
    priceValue: 2199,
    discountPercent: 20,
    category: 'Festival Poshak',
    stock: 8,
    rating: 4.9,
    badge: 'Luxury',
    description:
      'Regal gold brocade poshak with temple-border motifs, designed for Nanda Mahotsav and grand home celebrations.',
  },
  {
    name: 'Gokul Morning Yellow Poshak',
    priceValue: 999,
    discountPercent: 15,
    category: 'Daily Seva Poshak',
    stock: 35,
    rating: 4.7,
    badge: 'Value Pick',
    description:
      'Bright morning yellow cotton-silk blend for cheerful daily dressing, lightweight and easy to maintain.',
  },
  {
    name: 'Flute Bearer Cream Poshak',
    priceValue: 1249,
    discountPercent: 0,
    category: 'Laddu Gopal Poshak',
    stock: 22,
    rating: 4.5,
    description:
      'Cream-toned poshak with minimal zari and flute-inspired border trim, suited for understated elegant seva.',
  },
  {
    name: 'Holi Gulaal Festive Poshak',
    priceValue: 1699,
    discountPercent: 25,
    category: 'Festival Poshak',
    stock: 14,
    rating: 4.8,
    badge: 'Seasonal',
    description:
      'Multi-tone gulaal palette with festive embroidery, perfect for Holi, Rangotsav, and spring temple events.',
  },
  {
    name: 'Kesar Kesari Premium Poshak',
    priceValue: 1999,
    discountPercent: 17,
    category: 'Premium Zari Poshak',
    stock: 10,
    rating: 4.9,
    badge: 'Premium',
    description:
      'Saffron kesari silk with dense zari weaving and kundan accents, a premium choice for special darshan days.',
  },
  {
    name: 'Dwarka Royal Blue Poshak',
    priceValue: 1749,
    discountPercent: 14,
    category: 'Festival Poshak',
    stock: 11,
    rating: 4.7,
    description:
      'Royal blue brocade with crown motifs reflecting Dwarka kingship, finished with a polished ceremonial look.',
  },
  {
    name: 'Bansuri Mor Pankh Poshak',
    priceValue: 1349,
    discountPercent: 19,
    category: 'Laddu Gopal Poshak',
    stock: 19,
    rating: 4.8,
    badge: 'Trending',
    description:
      'Peacock feather-inspired border with bansuri detailing, a devotional favourite for children mandir setups.',
  },
  {
    name: 'Mathura Red Velvet Poshak',
    priceValue: 2299,
    discountPercent: 21,
    category: 'Winter Collection',
    stock: 7,
    rating: 5.0,
    badge: 'Winter Special',
    description:
      'Rich Mathura red velvet with antique gold zari, warm and luxurious for winter festivals and evening aarti.',
  },
  {
    name: 'Summer Breeze Cotton Poshak',
    priceValue: 849,
    discountPercent: 10,
    category: 'Summer Collection',
    stock: 40,
    rating: 4.6,
    badge: 'Summer Pick',
    description:
      'Breathable cotton poshak in cool pastels, designed for hot months without compromising devotional presentation.',
  },
  {
    name: 'Tulsi Garland Green Set',
    priceValue: 1149,
    discountPercent: 12,
    category: 'Daily Seva Poshak',
    stock: 26,
    rating: 4.7,
    description:
      'Tulsi-green fabric with vine embroidery symbolising purity and daily devotion in home mandirs.',
  },
  {
    name: 'Chappan Bhog Festive Poshak',
    priceValue: 2499,
    discountPercent: 23,
    category: 'Festival Poshak',
    stock: 5,
    rating: 4.9,
    badge: 'Limited',
    description:
      'Opulent multi-layer styling inspired by Chappan Bhog offerings, with ornate borders for grand celebrations.',
  },
  {
    name: 'Lotus Feet Pink Poshak',
    priceValue: 1279,
    discountPercent: 16,
    category: 'Laddu Gopal Poshak',
    stock: 21,
    rating: 4.8,
    description:
      'Soft lotus-pink silk with paduka motifs along the hem, a gentle and graceful look for daily worship.',
  },
  {
    name: 'Brindavan Starlight Silver Set',
    priceValue: 1849,
    discountPercent: 18,
    category: 'Janmashtami Collection',
    stock: 9,
    rating: 4.9,
    badge: 'Janmashtami',
    description:
      'Silver-thread star patterns on deep indigo silk evoke Brindavan nights, ideal for midnight Janmashtami dressing.',
  },
  {
    name: 'Cowshed Khaki Poshak',
    priceValue: 949,
    discountPercent: 8,
    category: 'Daily Seva Poshak',
    stock: 32,
    rating: 4.5,
    description:
      'Humble khaki-cream tones inspired by Gokul cowshed simplicity, perfect for everyday casual seva styling.',
  },
  {
    name: 'Raas Leela Multicolor Poshak',
    priceValue: 2099,
    discountPercent: 20,
    category: 'Festival Poshak',
    stock: 6,
    rating: 4.8,
    badge: 'Festival Pick',
    description:
      'Vibrant multicolor panels celebrate Raas Leela joy, with mirror work and festive borders for dance-season decor.',
  },
  {
    name: 'Shrinathji Srinagar Poshak',
    priceValue: 2599,
    discountPercent: 15,
    category: 'Premium Zari Poshak',
    stock: 4,
    rating: 5.0,
    badge: 'Heritage',
    description:
      'Pichwai-inspired detailing with heavy zari and sequin work, crafted for Shrinathji-style elaborate shringar.',
  },
  {
    name: 'Bal Gopal Starter Poshak',
    priceValue: 699,
    discountPercent: 0,
    category: 'Laddu Gopal Poshak',
    stock: 45,
    rating: 4.4,
    badge: 'Starter',
    description:
      'Affordable starter set for new devotees, simple cotton blend with clean finishing and easy sizing options.',
  },
  {
    name: 'Damodar Red Silk Poshak',
    priceValue: 1449,
    discountPercent: 13,
    category: 'Festival Poshak',
    stock: 17,
    rating: 4.7,
    description:
      'Damodar-red silk with waistband styling reference, finished with traditional knot-work borders.',
  },
  {
    name: 'Giriraj Crown Gold Poshak',
    priceValue: 2799,
    discountPercent: 24,
    category: 'Premium Zari Poshak',
    stock: 3,
    rating: 4.9,
    badge: 'Luxury',
    description:
      'Golden brocade with mountain and crown motifs honouring Giriraj Govardhan, a statement piece for major festivals.',
  },
  {
    name: 'Monsoon Megh Malhar Blue',
    priceValue: 1199,
    discountPercent: 11,
    category: 'Summer Collection',
    stock: 23,
    rating: 4.6,
    description:
      'Cloud-blue poshak with raindrop pearl accents, a refreshing monsoon-season look for home mandirs.',
  },
  {
    name: 'Sudama Friendship Yellow Set',
    priceValue: 1049,
    discountPercent: 14,
    category: 'Daily Seva Poshak',
    stock: 27,
    rating: 4.7,
    description:
      'Warm friendship-yellow tones with simple borders, inspired by Sudama-Krishna bond and everyday devotion.',
  },
  {
    name: 'Kaaliya Mardan Navy Poshak',
    priceValue: 1649,
    discountPercent: 17,
    category: 'Festival Poshak',
    stock: 13,
    rating: 4.8,
    description:
      'Deep navy silk with serpent-scale pattern zari, symbolising Kaaliya Mardan victory and divine strength.',
  },
  {
    name: 'Gopika Grace Lavender Poshak',
    priceValue: 1379,
    discountPercent: 16,
    category: 'Festival Poshak',
    stock: 15,
    rating: 4.8,
    badge: 'New',
    description:
      'Lavender silk with gopika-inspired floral borders, soft and feminine for coordinated temple displays.',
  },
  {
    name: 'Dwarkadhish Winter Shawl Set',
    priceValue: 2899,
    discountPercent: 19,
    category: 'Winter Collection',
    stock: 2,
    rating: 4.9,
    badge: 'Winter Special',
    description:
      'Layered winter poshak with attached shawl styling, plush velvet and heavy zari for cold-season celebrations.',
  },
  {
    name: 'Navnit White Pearl Poshak',
    priceValue: 1549,
    discountPercent: 18,
    category: 'Premium Zari Poshak',
    stock: 12,
    rating: 4.9,
    description:
      'Pure white navnit silk with pearl clusters and minimal gold trim, elegant for Purnima and sacred fasting days.',
  },
  {
    name: 'Govinda Ekadashi Green Gold',
    priceValue: 1799,
    discountPercent: 20,
    category: 'Janmashtami Collection',
    stock: 10,
    rating: 4.8,
    badge: 'Ekadashi',
    description:
      'Green and gold combination favoured for Ekadashi seva, with temple-border embroidery and crisp finishing.',
  },
]

export const shopProducts = poshakCatalog.map((item, index) =>
  createPoshak({
    id: index + 1,
    ...item,
    images: getImages(index),
  }),
)

export const productCategories = [
  'All',
  'Laddu Gopal Poshak',
  'Daily Seva Poshak',
  'Janmashtami Collection',
  'Festival Poshak',
  'Premium Zari Poshak',
  'Summer Collection',
  'Winter Collection',
]

export const detailedProducts = shopProducts

export const krishnaPoshaks = shopProducts
