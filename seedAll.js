const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Content = require('./src/models/Content');

dotenv.config();

// ─────────────────────────────────────────────────────────────────────
//  Wall clock images — ALL are real wall clock photos
// ─────────────────────────────────────────────────────────────────────
const WALCLOCK_IMAGES = [
  // Slider images (3)
  { public_id: 'slider-1', url: 'https://m.media-amazon.com/images/I/61Z7cwC1cbL._AC_UF894,1000_QL80_.jpg' },
  { public_id: 'slider-2', url: 'https://www.giftforyou.pk/image/cache/catalog/journal3/categories/wall-clocks/diy-wall-clocks/cyprus-modernized-3d-wall-clock-149-550x550.jpg' },
  { public_id: 'slider-3', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoeUmj2O5GnWbT9CY7CWr_vzrA7yYkuC_EFeO0h9bFwNzLvXwSG16nME&s=10' },

  // Product images (12) — all wall clock photos
  { public_id: 'wc-01', url: 'https://images.unsplash.com/photo-1563861826100-9cb8680cb0b6?w=600&q=80' },
  { public_id: 'wc-02', url: 'https://images.unsplash.com/photo-1507646227221-78c7b1a5b496?w=600&q=80' },
  { public_id: 'wc-03', url: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d38f86?w=600&q=80' },
  { public_id: 'wc-04', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { public_id: 'wc-05', url: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80' },
  { public_id: 'wc-06', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { public_id: 'wc-07', url: 'https://images.unsplash.com/photo-1586075088921-82b1e7268b9f?w=600&q=80' },
  { public_id: 'wc-08', url: 'https://www.kreative.pk/cdn/shop/files/3d_Wall_Clock_img.jpg?v=1725810751&width=493' },
  { public_id: 'wc-09', url: 'https://www.giftforyou.pk/image/cache/catalog/journal3/categories/wall-clocks/diy-wall-clocks/cyprus-modernized-3d-wall-clock-149-550x550.jpg' },
  { public_id: 'wc-10', url: 'https://m.media-amazon.com/images/I/61Z7cwC1cbL._AC_UF894,1000_QL80_.jpg' },
  { public_id: 'wc-11', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoeUmj2O5GnWbT9CY7CWr_vzrA7yYkuC_EFeO0h9bFwNzLvXwSG16nME&s=10' },
  { public_id: 'wc-12', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' }
];

// ─────────────────────────────────────────────────────────────────────
//  Categories — wall clock only
// ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Simple Wall Clock', description: 'Clean, minimal designs for everyday use.', imageIndex: 0 },
  { name: 'Aesthetic Wall Clock', description: 'Beauty meets function — clocks that double as wall art.', imageIndex: 3 },
  { name: '3D Wall Clock', description: 'Depth, dimension, and drama — standout 3D designs.', imageIndex: 7 },
  { name: 'Vintage Wall Clock', description: 'Retro-inspired classics with timeless charm.', imageIndex: 2 },
  { name: 'Kids Wall Clock', description: 'Fun, colorful, easy-to-read clocks for young spaces.', imageIndex: 4 },
  { name: 'LED & Digital Clock', description: 'Modern illumination with precise digital timekeeping.', imageIndex: 5 },
  { name: 'Luxury Wall Clock', description: 'Premium finishes, gold accents, and crystal details.', imageIndex: 6 },
  { name: 'Wooden Wall Clock', description: 'Warm, natural wood craftsmanship for cozy interiors.', imageIndex: 0 }
];

// ─────────────────────────────────────────────────────────────────────
//  Products — 12 wall clocks
// ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    name: 'Classic Wooden Wall Clock',
    description: 'Handcrafted wooden wall clock with a rustic finish. Silent sweep movement. Perfect for living rooms and kitchens.',
    price: 49.99, category: 'Wooden Wall Clock', stock: 50, ratings: 4.5, numOfReviews: 124,
    discount: 10, featured: true, isHero: true, brand: 'WallTimeArts',
    specs: [{ key: 'Material', value: 'Natural Wood' }, { key: 'Movement', value: 'Quiet Sweep' }, { key: 'Size', value: '12x12 inches' }]
  },
  {
    name: 'Modern LED Digital Clock',
    description: 'Sleek LED display with adjustable brightness. Battery or USB powered. Great for offices and bedrooms.',
    price: 34.99, category: 'LED & Digital Clock', stock: 75, ratings: 4.3, numOfReviews: 89,
    discount: 5, featured: true, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Display', value: 'LED Digital' }, { key: 'Power', value: 'Battery + USB' }, { key: 'Size', value: '10x4 inches' }]
  },
  {
    name: 'Vintage Roman Numeral Clock',
    description: 'Elegant vintage-style clock with classic Roman numerals. Brass-toned bezel, cream dial.',
    price: 59.99, category: 'Vintage Wall Clock', stock: 30, ratings: 4.7, numOfReviews: 156,
    discount: 15, featured: true, isHero: true, brand: 'WallTimeArts',
    specs: [{ key: 'Style', value: 'Roman Numeral' }, { key: 'Bezel', value: 'Brass Tone' }, { key: 'Size', value: '10 inch diameter' }]
  },
  {
    name: 'Artistic Floral Wall Clock',
    description: 'Beautiful floral artwork on a white face. A unique piece of wall art that tells time.',
    price: 74.99, category: 'Aesthetic Wall Clock', stock: 20, ratings: 4.9, numOfReviews: 98,
    discount: 20, featured: true, isHero: true, brand: 'WallTimeArts',
    specs: [{ key: 'Design', value: 'Floral Artwork' }, { key: 'Face', value: 'White' }, { key: 'Size', value: '11 inch diameter' }]
  },
  {
    name: 'Minimalist Black Square Clock',
    description: 'Ultra-minimalist matte black square clock. Clean lines, silent movement. Modern statement piece.',
    price: 39.99, category: 'Simple Wall Clock', stock: 60, ratings: 4.4, numOfReviews: 203,
    discount: 0, featured: true, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Shape', value: 'Square' }, { key: 'Color', value: 'Matte Black' }, { key: 'Size', value: '12x12 inches' }]
  },
  {
    name: '3D Geometric Wall Clock',
    description: 'Eye-catching 3D geometric design creating depth and visual interest. Lightweight foam board.',
    price: 44.99, category: '3D Wall Clock', stock: 40, ratings: 4.6, numOfReviews: 77,
    discount: 10, featured: false, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Design', value: '3D Geometric' }, { key: 'Material', value: 'Foam Board' }, { key: 'Size', value: '10 inch diameter' }]
  },
  {
    name: 'Kids Cartoon Wall Clock',
    description: 'Fun cartoon-themed clock with bright colors and easy-to-read numbers. Battery included.',
    price: 24.99, category: 'Kids Wall Clock', stock: 100, ratings: 4.2, numOfReviews: 312,
    discount: 5, featured: false, isHero: false, brand: 'WallTimeArts Kids',
    specs: [{ key: 'Theme', value: 'Cartoon' }, { key: 'Numbers', value: 'Large & Bright' }, { key: 'Size', value: '8 inch diameter' }]
  },
  {
    name: 'Gold Plated Luxury Clock',
    description: 'Premium gold-plated wall clock with crystal accents. Luxury addition to any upscale space.',
    price: 89.99, category: 'Luxury Wall Clock', stock: 15, ratings: 4.8, numOfReviews: 45,
    discount: 25, featured: true, isHero: false, brand: 'WallTimeArts Luxury',
    specs: [{ key: 'Finish', value: 'Gold Plated' }, { key: 'Accents', value: 'Crystal' }, { key: 'Size', value: '14 inch diameter' }]
  },
  {
    name: 'Sakura Cherry Blossom Clock',
    description: 'Delicate cherry blossom design on white ceramic face. Soft pink tones bring serenity.',
    price: 54.99, category: 'Aesthetic Wall Clock', stock: 25, ratings: 4.7, numOfReviews: 88,
    discount: 10, featured: true, isHero: true, brand: 'WallTimeArts',
    specs: [{ key: 'Design', value: 'Cherry Blossom' }, { key: 'Face', value: 'Ceramic White' }, { key: 'Size', value: '10 inch diameter' }]
  },
  {
    name: 'Industrial Metal Wall Clock',
    description: 'Rugged industrial-style clock with exposed gears and metal finish. Great for lofts and garages.',
    price: 42.99, category: 'Simple Wall Clock', stock: 35, ratings: 4.3, numOfReviews: 167,
    discount: 0, featured: false, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Style', value: 'Industrial' }, { key: 'Material', value: 'Metal' }, { key: 'Size', value: '12x12 inches' }]
  },
  {
    name: 'Sunburst Wall Clock',
    description: 'Radiant sunburst design adding warmth and energy. Gold and copper tones create a stunning focal point.',
    price: 64.99, category: 'Aesthetic Wall Clock', stock: 18, ratings: 4.8, numOfReviews: 52,
    discount: 15, featured: true, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Design', value: 'Sunburst' }, { key: 'Colors', value: 'Gold & Copper' }, { key: 'Size', value: '16 inch diameter' }]
  },
  {
    name: 'Magnetic Levitation Clock',
    description: 'Futuristic magnetic levitation clock that floats and rotates. USB powered with touch control.',
    price: 129.99, category: 'LED & Digital Clock', stock: 8, ratings: 4.9, numOfReviews: 23,
    discount: 10, featured: true, isHero: false, brand: 'WallTimeArts',
    specs: [{ key: 'Technology', value: 'Magnetic Levitation' }, { key: 'Power', value: 'USB' }, { key: 'Size', value: '8 inch diameter' }]
  }
];

// ─────────────────────────────────────────────────────────────────────
//  Hero slides — 3 wall clock images
// ─────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    title: 'Time',
    highlight: 'Designed Anew.',
    subtitle: 'Wall Clock Collection',
    description: 'From simple to stunning — our clocks transform every wall into a story.',
    buttonText: 'Shop Wall Clocks',
    link: '/products',
    image: WALCLOCK_IMAGES[0].url
  },
  {
    title: 'Simple',
    highlight: 'Clean & Classic.',
    subtitle: 'Simple Wall Clocks',
    description: 'Minimal designs that blend into any room — quiet, clean, timeless.',
    buttonText: 'Shop Simple Clocks',
    link: '/products?category=Simple%20Wall%20Clock',
    image: WALCLOCK_IMAGES[1].url
  },
  {
    title: 'Aesthetic',
    highlight: 'Wall Art You Can Read.',
    subtitle: 'Aesthetic Wall Clocks',
    description: 'Beautiful designs that turn every tick into a masterpiece.',
    buttonText: 'Shop Aesthetic Clocks',
    link: '/products?category=Aesthetic%20Wall%20Clock',
    image: WALCLOCK_IMAGES[2].url
  }
];

// ─────────────────────────────────────────────────────────────────────
//  Site settings
// ─────────────────────────────────────────────────────────────────────
const SITE_SETTINGS = {
  siteName: 'WallTimeArts',
  seoKeywords: 'wall clocks, aesthetic clocks, 3D clocks, vintage clocks, kids clocks, LED clocks, luxury clocks, wooden clocks',
  logoUrl: '',
  announcementEnabled: true,
  topBarText: 'Handcrafted Wall Clocks | Free Shipping on Orders Over Rs 50'
};

const FOOTER = {
  description: 'Curating distinctive wall clocks for every wall. Crafted with passion, designed to last.',
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=61588316309529',
    instagram: 'https://www.instagram.com/walltimearts/',
    tiktok: 'https://www.tiktok.com/@walltimearts',
    youtube: 'https://www.youtube.com/@walltimearts'
  },
  copyrightText: '© 2026 WallTimeArts. All rights reserved.'
};

// ─────────────────────────────────────────────────────────────────────
//  Main seed
// ─────────────────────────────────────────────────────────────────────
const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // 1. Admin
    const adminData = {
      name: 'WallTimeArts Admin',
      email: 'superadmin@walltimearts.com',
      password: 'superADMIN#2026',
      phone: '1234567890',
      role: 'admin',
      isVerified: true
    };
    let admin = await User.findOne({ email: adminData.email });
    if (admin) {
      admin.role = 'admin';
      admin.isVerified = true;
      admin.phone = adminData.phone;
      admin.name = adminData.name;
      await admin.save();
      console.log('Admin updated.');
    } else {
      admin = await User.create(adminData);
      console.log('Admin created.');
    }

    // 2. Categories
    const categories = [];
    for (const cat of CATEGORIES) {
      const img = WALCLOCK_IMAGES[cat.imageIndex];
      let existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        existing = await Category.create({
          name: cat.name,
          slug: slugify(cat.name, { lower: true, strict: true }),
          description: cat.description,
          image: img.url
        });
        console.log('Category created:', cat.name);
      } else {
        existing.description = cat.description;
        existing.image = img.url;
        await existing.save();
        console.log('Category updated:', cat.name);
      }
      categories.push(existing);
    }

    // 3. Products
    const catMap = {};
    categories.forEach(c => catMap[c.name] = c._id);

    for (let i = 0; i < PRODUCTS.length; i++) {
      const p = PRODUCTS[i];
      const catId = catMap[p.category];
      if (!catId) { console.warn('Missing category for:', p.name); continue; }

      const imgIndex = i % (WALCLOCK_IMAGES.length - 3); // skip slider images
      const mainImg = WALCLOCK_IMAGES[3 + imgIndex];
      const altImg = WALCLOCK_IMAGES[(3 + imgIndex + 1) % WALCLOCK_IMAGES.length];

      const existing = await Product.findOne({ name: p.name });
      if (!existing) {
        await Product.create({
          name: p.name,
          description: p.description,
          price: p.price,
          category: catId,
          images: [mainImg, altImg],
          image: mainImg.url,
          secondaryImage: altImg.url,
          stock: p.stock,
          ratings: p.ratings,
          numOfReviews: p.numOfReviews,
          specifications: p.specs,
          discount: p.discount,
          featured: p.featured,
          isHero: p.isHero,
          brand: p.brand,
          user: admin._id
        });
        console.log('Product created:', p.name);
      } else {
        existing.category = catId;
        existing.image = mainImg.url;
        existing.secondaryImage = altImg.url;
        existing.images = [mainImg, altImg];
        existing.price = p.price;
        existing.stock = p.stock;
        existing.discount = p.discount;
        existing.featured = p.featured;
        existing.isHero = p.isHero;
        existing.brand = p.brand;
        existing.description = p.description;
        existing.specifications = p.specs;
        await existing.save();
        console.log('Product updated:', p.name);
      }
    }

    // 4. Content (hero slides, site settings, footer)
    let content = await Content.findOne({ identifier: 'home_page' });
    if (!content) {
      content = await Content.create({
        identifier: 'home_page',
        siteSettings: SITE_SETTINGS,
        heroSlides: HERO_SLIDES,
        footer: FOOTER,
        flashSale: {
          enabled: true,
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          title: 'Flash Sale',
          subtitle: 'Limited Time Offer',
          discount: 20,
          products: []
        }
      });
      console.log('Content created with hero slides.');
    } else {
      content.siteSettings = { ...content.siteSettings.toObject(), ...SITE_SETTINGS };
      content.heroSlides = HERO_SLIDES;
      content.footer = { ...content.footer.toObject(), ...FOOTER };
      await content.save();
      console.log('Content updated with hero slides.');
    }

    console.log('\n✅ Seed complete!');
    console.log(`   Admin: ${admin.email}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${PRODUCTS.length}`);
    console.log(`   Hero Slides: ${HERO_SLIDES.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
};

seedAll();
