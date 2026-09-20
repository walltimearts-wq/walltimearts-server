const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true,
        default: 'home_page'
    },
    // Header Configuration
    header: {
        topBarText: { type: String, default: '100% Organic & Fairtrade | Free Shipping on Orders Over Rs 100' },
        announcementEnabled: { type: Boolean, default: true }
    },
    // Hero Section (Legacy/Fallback)
    hero: {
        title: { type: String, default: "Sleep in Nature's" },
        highlight: { type: String, default: "Embrace" },
        subtitle: { type: String, default: "The New Collection" },
        buttonText: { type: String, default: "Shop Collection" },
        image: { type: String, default: "https://images.unsplash.com/photo-1595521624992-48a59d495e6d?q=80&w=2487&auto=format&fit=crop" },
        link: { type: String, default: "/products" }
    },
    // Hero Slider (Dynamic)
    heroSlides: [{
        title: { type: String },
        highlight: { type: String },
        subtitle: { type: String },
        description: { type: String },
        buttonText: { type: String },
        link: { type: String },
        image: { type: String }
    }],
    // Impact Section
    impact: {
        title: { type: String, default: "Change the World" },
        highlight: { type: String, default: "While You Sleep" },
        description: { type: String, default: "We believe that luxury shouldn't cost the earth. That's why every product is crafted from 100% organic, Fairtrade certified materials." },
        image: { type: String, default: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000" }
    },
    // USPs
    usps: [{
        icon: { type: String, default: 'leaf' },
        text: { type: String }
    }],
    // Legacy fields preserved for safety, or we can reuse
    siteSettings: {
        siteName: { type: String, default: 'WallTimeArts' },
        seoKeywords: { type: String, default: 'luxury, ecommerce, artifacts' },
        metaTitle: { type: String, default: 'WallTimeArts | Distinctive Timepieces & Wall Art' },
        metaDescription: { type: String, default: 'Shop handcrafted wall clocks and distinctive timepieces at WallTimeArts. Eco-friendly, artisan-made designs with free shipping on orders over Rs 50.' },
        logoUrl: { type: String, default: '' }
    },
    latestAdditions: {
        count: { type: Number, default: 6, max: 20 }
    },
    // Store-wide theme applied by admin (colors + typography)
    theme: {
        preset: { type: String, default: 'default' },
        isCustom: { type: Boolean, default: false },
        colors: {
            primary: { type: String, default: '#2c5f2d' },
            primaryDark: { type: String, default: '#1e3f1f' },
            secondary: { type: String, default: '#c8a97e' },
            accent: { type: String, default: '#e67e22' },
            background: { type: String, default: '#fdfaf5' },
            surface: { type: String, default: '#ffffff' },
            border: { type: String, default: '#e5e0d8' },
            text: { type: String, default: '#2b2b2b' },
            textMuted: { type: String, default: '#6b6b6b' },
            success: { type: String, default: '#2e7d32' },
            danger: { type: String, default: '#c0392b' }
        },
        typography: {
            fontFamily: { type: String, default: "'Inter', 'Segoe UI', sans-serif" },
            headingFont: { type: String, default: "'Playfair Display', Georgia, serif" },
            baseFontSize: { type: String, default: '16px' },
            borderRadius: { type: String, default: '8px' }
        }
    },
    flashSale: {
        enabled: { type: Boolean, default: true },
        endTime: { type: Date },
        title: { type: String, default: 'Flash Artifacts' },
        subtitle: { type: String, default: 'Limited Availability' },
        discount: { type: Number, default: 0 },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
    },
    footer: {
        description: { type: String, default: 'Curating premium essentials for your modern lifestyle. Quality meets aesthetic in every piece we offer.' },
        socialLinks: {
            facebook: { type: String, default: '#' },
            twitter: { type: String, default: '#' },
            instagram: { type: String, default: '#' },
            github: { type: String, default: '#' }
        },
        newsletterText: { type: String, default: 'Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.' },
        copyrightText: { type: String, default: '© 2026 WallTimeArts. All rights reserved.' }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
