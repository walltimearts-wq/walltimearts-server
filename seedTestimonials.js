const mongoose = require('mongoose');
const Testimonial = require('./src/models/Testimonial');
require('dotenv').config();

const testimonials = [
    {
        name: 'Ayesha Khan',
        role: 'Interior Designer',
        company: 'Roshan Interiors, Lahore',
        content: 'I have styled living rooms across Lahore and WallTimeArts clocks are my go-to statement piece. The wooden finish and roman numerals blend beautifully with both classic and modern interiors. The craftsmanship is truly premium.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=45',
        isActive: true
    },
    {
        name: 'Hamza Sheikh',
        role: 'Home Décor Blogger',
        company: 'DécorDose, Karachi',
        content: 'Ordered the 3D acrylic clock for my studio and it completely transformed the wall. Packaging was secure, delivery to Karachi took just 3 days, and the finishing is flawless. Highly recommended for anyone upgrading their space!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=13',
        isActive: true
    },
    {
        name: 'Bilal Ahmed',
        role: 'Boutique Hotel Manager',
        company: 'Serenity Guest House, Islamabad',
        content: 'We fitted all our lounge walls with WallTimeArts clocks and guests constantly ask where they are from. The silent movement is perfect for guest rooms — elegant, accurate and totally quiet.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12',
        isActive: true
    },
    {
        name: 'Fatima Malik',
        role: 'Architect',
        company: 'Malik & Partners, Lahore',
        content: 'Clean lines, accurate timekeeping and a finish that looks far more expensive than the price. The minimalist range fits my modern projects perfectly. I will definitely be ordering more for our upcoming office project.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=9',
        isActive: true
    },
    {
        name: 'Usman Tariq',
        role: 'Gift Shop Owner',
        company: 'Tarqeeb Treasures, Faisalabad',
        content: 'I stock these clocks in my shop and they sell out fast. Customers love the artistic designs and sturdy build quality. WallTimeArts has become my most trusted supplier for wall clocks in Pakistan.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=14',
        isActive: true
    },
    {
        name: 'Zainab Aslam',
        role: 'School Teacher',
        company: 'Rawalpindi',
        content: 'Bought the vintage wall clock for our classroom and the kids love reading the big numerals. It keeps perfect time and the quality is excellent. Delivery was quick and the clock arrived well packed.',
        rating: 4,
        avatar: 'https://i.pravatar.cc/150?img=47',
        isActive: true
    },
    {
        name: 'Ahmed Raza',
        role: 'Café Owner',
        company: 'Chai Kada Café, Multan',
        content: 'The rustic wooden clock adds so much character to our café wall that customers compliment it daily. Great craftsmanship, fair price and honest service — exactly what a small business like mine needs.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=51',
        isActive: true
    }
];

const seedTestimonials = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for testimonial seeding...');

        // Clear existing testimonials
        await Testimonial.deleteMany({});
        console.log('Existing testimonials cleared.');

        // Insert new testimonials
        await Testimonial.insertMany(testimonials);
        console.log(`${testimonials.length} testimonials seeded successfully!`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding testimonials:', error);
        process.exit(1);
    }
};

seedTestimonials();
