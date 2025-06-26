const mongoose = require('mongoose');
const Package = require('./models/packageModel');

mongoose.connect('mongodb://localhost:27017/bookfortravel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const packages = [
  {
    name: 'Dubai Explorer',
    description: 'Discover the futuristic city of Dubai with its skyscrapers, desert safaris, and luxury experiences.',
    price: 59999,
    location: 'Dubai, UAE',
    imageUrl: 'https://source.unsplash.com/800x600/?dubai,cityscape',
  },
  {
    name: 'Vietnam Wonders',
    description: 'Experience the stunning landscapes of Halong Bay, ancient temples, and vibrant markets.',
    price: 44999,
    location: 'Vietnam',
    imageUrl: 'https://source.unsplash.com/800x600/?vietnam,landscape',
  },
  {
    name: 'Thailand Getaway',
    description: 'Enjoy the pristine beaches of Phuket, the bustling streets of Bangkok, and authentic Thai cuisine.',
    price: 39999,
    location: 'Thailand',
    imageUrl: 'https://source.unsplash.com/800x600/?thailand,beach',
  },
  {
    name: 'Magical Malaysia',
    description: 'Explore the vibrant city of Kuala Lumpur, lush rainforests, and stunning islands.',
    price: 47999,
    location: 'Malaysia',
    imageUrl: 'https://source.unsplash.com/800x600/?malaysia,city',
  },
  {
    name: 'Kashmir Paradise',
    description: 'Witness the breathtaking beauty of the valleys, lakes, and gardens of Kashmir.',
    price: 34999,
    location: 'Kashmir, India',
    imageUrl: 'https://source.unsplash.com/800x600/?kashmir,mountains',
  },
  {
    name: 'Singapore Adventure',
    description: 'Explore the stunning Marina Bay Sands, Sentosa Island, and world-class shopping districts.',
    price: 61999,
    location: 'Singapore',
    imageUrl: 'https://source.unsplash.com/800x600/?singapore,cityscape',
  },
  {
    name: 'Bhutan Serenity',
    description: 'Experience the peaceful monasteries, stunning landscapes, and unique culture of Bhutan.',
    price: 55999,
    location: 'Bhutan',
    imageUrl: 'https://source.unsplash.com/800x600/?bhutan,monastery',
  },
  {
    name: 'South Africa Safari',
    description: 'Embark on a thrilling wildlife safari, visit Cape Town, and experience rich cultural heritage.',
    price: 84999,
    location: 'South Africa',
    imageUrl: 'https://source.unsplash.com/800x600/?southafrica,safari',
  },
  {
    name: 'European Grand Tour',
    description: 'A mesmerizing journey through Paris, Rome, Amsterdam, and other iconic European cities.',
    price: 179999,
    location: 'Europe',
    imageUrl: 'https://source.unsplash.com/800x600/?europe,landmark',
  },
  {
    name: 'USA Coast-to-Coast',
    description: 'Explore New York, Los Angeles, the Grand Canyon, and everything in between.',
    price: 229999,
    location: 'USA',
    imageUrl: 'https://source.unsplash.com/800x600/?usa,city',
  },
];

Package.insertMany(packages)
  .then(() => {
    console.log('Packages inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting packages:', error);
  });
