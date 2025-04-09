require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const fs = require("fs");
const { Parser } = require("json2csv");

// Define the headline schema (same as in uploadToDb.js)
const headlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  platform: {
    type: String,
    required: true,
    enum: [
      "Print",
      "Facebook Ad",
      "Instagram Ad",
      "Blog",
      "Billboard",
      "Google Search Results",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Headline = mongoose.model("Headline", headlineSchema);

async function exportToCSV() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetch all headlines
    const headlines = await Headline.find({});
    console.log(`Found ${headlines.length} headlines`);

    // Configure CSV Parser
    const fields = ["headline", "platform", "brand", "createdAt"];
    const opts = { fields };
    const parser = new Parser(opts);

    // Convert to CSV
    const csv = parser.parse(headlines);

    // Write to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `headlines-export-${timestamp}.csv`;
    fs.writeFileSync(filename, csv);

    console.log(`✓ Export complete! File saved as: ${filename}`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Export failed:", error);
    process.exit(1);
  }
}

// Run the export
exportToCSV();
