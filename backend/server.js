// Database Connection
const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      console.log('⚠️ No Mongo URI found');
      return;
    }

    // 🛡️ SAFETY FIX: Agar galti se Quotes (" ") ya Space aa jaye to hata do
    dbUrl = dbUrl.replace(/"/g, '').trim();

    await mongoose.connect(dbUrl);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.log('❌ DB Connection Failed:', err.message);
  }
};

connectDB();