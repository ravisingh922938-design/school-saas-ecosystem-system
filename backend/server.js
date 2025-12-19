// Database Connection with Debugging
const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGO_URI;

    // 🕵️‍♂️ JAASOOSI LOG (Check karein ki Render ko kya mil raha hai)
    console.log("------------------------------------------------");
    console.log("DEBUG: Raw MONGO_URI Type:", typeof dbUrl);
    console.log("DEBUG: First 15 chars:", JSON.stringify(dbUrl).substring(0, 15));
    console.log("------------------------------------------------");

    if (!dbUrl) {
      console.log('⚠️ No Mongo URI found');
      return;
    }

    // Safai Abhiyan: Quotes aur Spaces hatana
    // Yeh single quote (') aur double quote (") dono hata dega
    dbUrl = dbUrl.replace(/['"]+/g, '').trim();

    await mongoose.connect(dbUrl);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.log('❌ DB Error:', err.message);
  }
};

connectDB();