const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_DB;

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // ✅ Force SSL
    tlsAllowInvalidCertificates: true, // ✅ Ignore local SSL mismatches (safe for dev)
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection error:", err);
  });
