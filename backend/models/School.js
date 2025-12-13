const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolId: { type: String, required: true, unique: true }, // e.g. DPS-DELHI
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Branding (App ka look change karne ke liye)
  branding: {
    logo: { type: String, default: "https://via.placeholder.com/150" }, // App Icon inside
    banner: { type: String, default: "https://via.placeholder.com/800x200" }, // Dashboard Header
    primaryColor: { type: String, default: "#2563eb" }, // Main Button/Header Color
    secondaryColor: { type: String, default: "#1e40af" }, // Sidebar/Footer Color
    tagline: { type: String, default: "Excellence in Education" }
  },

  // Contact Info (Footer/Contact page ke liye)
  contact: {
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    website: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);