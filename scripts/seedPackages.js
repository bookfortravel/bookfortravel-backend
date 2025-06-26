const connectDB = require("../db");
const Package = require("../models/Package");

const packages = [
  {
    name: "Dubai Luxury Escape",
    country: "Dubai",
    price: 75000,
    originalPrice: 88000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Dubai_fz0bce.jpg",
    duration: 5,
    nights: 4,
    rating: 4.6,
    ratingCount: "53 reviews",
    cities: ["Dubai"],
    activities: ["Burj Khalifa", "Desert Safari", "Dhow Cruise"]
  },
  {
    name: "Beautiful Beaches of Thailand",
    country: "Thailand",
    price: 55000,
    originalPrice: 63000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Thailand_tlmhmj.jpg",
    duration: 6,
    nights: 5,
    rating: 4.6,
    ratingCount: "99 reviews",
    cities: ["Bangkok", "Phuket"],
    activities: ["Phi Phi Island", "Night Market", "Beach Party"]
  },
  {
    name: "Vietnam Scenic Wonders",
    country: "Vietnam",
    price: 60000,
    originalPrice: 70000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Vietnam_exmal9.jpg",
    duration: 6,
    nights: 5,
    rating: 4.4,
    ratingCount: "92 reviews",
    cities: ["Hanoi", "Halong Bay"],
    activities: ["Junk Boat Cruise", "Caves", "Floating Village"]
  },
  {
    name: "Malaysia Adventure",
    country: "Malaysia",
    price: 62000,
    originalPrice: 71000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Malaysia_tpepvj.jpg",
    duration: 5,
    nights: 4,
    rating: 4.4,
    ratingCount: "52 reviews",
    cities: ["Kuala Lumpur", "Langkawi"],
    activities: ["Sky Bridge", "Cable Car", "Island Hopping"]
  },
  {
    name: "Scenic North East India",
    country: "North East India",
    price: 50000,
    originalPrice: 58000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/North_East_India_psdulq.jpg",
    duration: 7,
    nights: 6,
    rating: 4.7,
    ratingCount: "73 reviews",
    cities: ["Shillong", "Kaziranga"],
    activities: ["Wildlife Safari", "Waterfalls", "Cultural Dance"]
  },
  {
    name: "Kerala Backwaters Retreat",
    country: "Kerala",
    price: 58000,
    originalPrice: 67000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Kerela_a8wu3m.jpg",
    duration: 6,
    nights: 5,
    rating: 4.5,
    ratingCount: "75 reviews",
    cities: ["Alleppey", "Munnar"],
    activities: ["Houseboat", "Tea Gardens", "Ayurvedic Massage"]
  },
  {
    name: "Kashmir Paradise",
    country: "Kashmir",
    price: 65000,
    originalPrice: 74000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Kashmir_qe4s3d.jpg",
    duration: 6,
    nights: 5,
    rating: 4.7,
    ratingCount: "54 reviews",
    cities: ["Srinagar", "Gulmarg"],
    activities: ["Shikara Ride", "Snow Fun", "Mughal Gardens"]
  },
  {
    name: "Singapore City Delights",
    country: "Singapore",
    price: 70000,
    originalPrice: 79000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Singapore_uibw6f.jpg",
    duration: 4,
    nights: 3,
    rating: 4.5,
    ratingCount: "100 reviews",
    cities: ["Singapore"],
    activities: ["Sentosa", "Night Safari", "Universal Studios"]
  },
  {
    name: "Abu Dhabi Grand Experience",
    country: "Abu Dhabi",
    price: 72000,
    originalPrice: 81000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Abu_Dhabi_rn7mtg.jpg",
    duration: 5,
    nights: 4,
    rating: 4.4,
    ratingCount: "84 reviews",
    cities: ["Abu Dhabi"],
    activities: ["Sheikh Zayed Mosque", "Ferrari World", "Corniche"]
  },
  {
    name: "Japan Cherry Blossom Tour",
    country: "Japan",
    price: 80000,
    originalPrice: 95000,
    image: "https://res.cloudinary.com/drvigtwgm/image/upload/w_800,h_600,c_fill,f_auto,q_auto/Japan_gzgu7d.jpg",
    duration: 7,
    nights: 6,
    rating: 4.8,
    ratingCount: "67 reviews",
    cities: ["Tokyo", "Kyoto"],
    activities: ["Cherry Blossoms", "Shrines", "Bullet Train"]
  },
  {
    name: "Enchanting Europe",
    country: "Europe",
    price: 120000,
    originalPrice: 135000,
    image: "https://i.postimg.cc/GhjxDgtB/Europenew.jpg",
    duration: 10,
    nights: 9,
    rating: 4.6,
    ratingCount: "76 reviews",
    cities: ["Paris", "Rome", "Amsterdam"],
    activities: ["Eiffel Tower", "Canal Cruise", "Museums"]
  },
  {
    name: "Goa Beach Holiday",
    country: "Goa",
    price: 42000,
    originalPrice: 48000,
    image: "https://i.postimg.cc/sDzJvCjd/Goa.jpg",
    duration: 4,
    nights: 3,
    rating: 4.5,
    ratingCount: "85 reviews",
    cities: ["North Goa", "South Goa"],
    activities: ["Beach Shacks", "Water Sports", "Nightlife"]
  }
];

async function seedPackages() {
  try {
    await connectDB();
    await Package.deleteMany();
    console.log("🧹 Old packages deleted");
    await Package.insertMany(packages);
    console.log("✅ New packages inserted");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedPackages();

