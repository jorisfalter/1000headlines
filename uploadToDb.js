require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

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
    enum: ["print", "facebook ad", "instagram ad", "other"], // Add more media types as needed
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
async function uploadHeadline(headlineData) {
  try {
    const headline = new Headline(headlineData);
    await headline.save();
    console.log("Headline uploaded successfully:", headline);
  } catch (error) {
    console.error("Error uploading headline:", error);
  }
}

// Modified to handle async operations and termination
async function uploadAndTerminate(headlines) {
  try {
    // Upload all headlines
    for (const { headline, brand, media } of headlines) {
      await uploadHeadline({ headline, brand, media });
    }

    // Close the MongoDB connection and exit
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Example usage with your headlines
const headlinesToUpload = [
  {
    headline:
      "At 60 miles an hour the loudest noise in this new Rolls-Royce comes from the electric clock",
    brand: "Rolls-Royce",
    media: "print",
    createdAt: new Date(),
  },
  {
    headline:
      "Wife of famous movie star swears under oath her new perfume does not contain an illegal sexual stimulant",
    brand: "",
    media: "print",
    createdAt: new Date(),
  },
  {
    headline:
      "Sam Ovens Shares His Simple Process For Starting A Consulting Business And Scaling It To 7-Figures Quickly",
    brand: "Consulting.com",
    media: "facebook ad",
    createdAt: new Date(),
  },
];

uploadAndTerminate(headlinesToUpload);
