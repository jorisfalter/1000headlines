require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parse");

// Define the headline schema
const headlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  media: {
    type: String,
    required: true,
    enum: [
      "Print",
      "Facebook Ad",
      "Instagram Ad",
      "Google Ad",
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

// Create the model
const Headline = mongoose.model("Headline", headlineSchema);

// Connect to MongoDB using the URI from .env.local
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to upload a headline
async function uploadHeadline(headline) {
  try {
    const headlineDoc = {
      headline: headline.headline,
      media: headline.platform,
      brand: headline.brand,
      createdAt: new Date(),
    };

    const response = await Headline.create(headlineDoc);
    console.log("✓ Uploaded:", headline.headline.substring(0, 50) + "...");
    return response;
  } catch (error) {
    console.error("Error uploading headline:", error);
  }
}

// Add logging to the upload process
async function uploadAndTerminate(csvFilePath) {
  try {
    const headlines = await readHeadlinesFromCsv(csvFilePath);
    console.log(`Reading ${headlines.length} headlines from CSV...`);

    // Upload all headlines with progress tracking
    let successCount = 0;
    for (const headline of headlines) {
      try {
        await uploadHeadline(headline);
        successCount++;
        console.log(`✓ Uploaded: "${headline.headline.substring(0, 50)}..."`);
      } catch (error) {
        console.error(`✗ Failed to upload headline: ${headline.headline}`);
        console.error(`  Error: ${error.message}`);
      }
    }

    console.log(`\nUpload complete!`);
    console.log(
      `Successfully uploaded ${successCount} of ${headlines.length} headlines`
    );

    // Close the MongoDB connection and exit
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Update the CSV parsing function to handle Excel/Table exports
async function readHeadlinesFromCsv(filepath) {
  return new Promise((resolve, reject) => {
    console.log(`Reading CSV from: ${filepath}`);

    if (!fs.existsSync(filepath)) {
      console.error(`File not found: ${filepath}`);
      reject(new Error(`File not found: ${filepath}`));
      return;
    }

    const headlines = [];
    fs.createReadStream(filepath)
      .pipe(
        csv.parse({
          columns: true,
          trim: true,
          skipEmptyLines: true,
          delimiter: ",",
        })
      )
      .on("data", (row) => {
        // Simple debug log to see what we're getting
        console.log("CSV Column Names:", Object.keys(row));
        console.log("Row Data:", row);

        // Try to find the right fields
        const headline = row.headline || row.Headline || row.title || row.Title;
        const platform = row.media || row.Media || row.platform || row.Platform;
        const brand =
          row.brand || row.Brand || row.company || row.Company || "";

        if (headline && platform) {
          headlines.push({
            headline: headline.trim(),
            brand: brand.trim(),
            platform: platform.trim(),
            createdAt: new Date(),
          });
        } else {
          console.log("Missing required fields in row:", row);
        }
      })
      .on("end", () => {
        console.log(`Found ${headlines.length} valid headlines`);
        resolve(headlines);
      })
      .on("error", (error) => {
        console.error("CSV parsing error:", error);
        reject(error);
      });
  });
}

// Remove or comment out the old headlinesToUpload array
// const headlinesToUpload = [ ... ];

// Call the function with the CSV file path
uploadAndTerminate("headlines.csv");
