import mongoose from 'mongoose'

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://joris:yl57p9dVH5dC7Uow@cluster0.je8gqlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Define valid categories type
type HeadlineCategory = 
  | 'print'
  | 'facebook-ad'
  | 'google-ad'
  | 'blog-title'
  | 'linkedin-post'
  | 'tweet'
  | 'instagram-caption'
  | 'email-subject'

// Headline Schema
const HeadlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: false,
    trim: true,
  },
  categories: [{
    type: String,
    enum: [
      'print',
      'facebook-ad',
      'google-ad',
      'blog-title',
      'linkedin-post',
      'tweet',
      'instagram-caption',
      'email-subject'
    ],
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create model (only if it doesn't exist)
const Headline = mongoose.models.Headline || mongoose.model('Headline', HeadlineSchema)

async function addHeadline(headline: string, brand: string, categories: HeadlineCategory[]) {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    console.log('Adding headline:', { headline, brand, categories })
    
    const newHeadline = await Headline.create({
      headline,
      brand,
      categories,
    })

    console.log('Successfully added headline:', newHeadline)
    
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

function parseCommandLineArgs(): { headline: string; brand: string; categories: HeadlineCategory[] } {
  const args = process.argv.slice(2)
  let current = ''
  let inQuotes = false
  const parsed: string[] = []

  // Properly handle quoted strings
  for (const arg of args) {
    if (arg.startsWith('"') && !inQuotes) {
      current = arg.slice(1)
      inQuotes = true
    } else if (arg.endsWith('"') && inQuotes) {
      current += ' ' + arg.slice(0, -1)
      parsed.push(current)
      current = ''
      inQuotes = false
    } else if (inQuotes) {
      current += ' ' + arg
    } else {
      parsed.push(arg)
    }
  }

  if (parsed.length < 3) {
    console.log(`
Usage: ts-node scripts/add-headline.ts "<headline>" "<brand>" "<category1,category2,...>"

Example: 
ts-node scripts/add-headline.ts "10 Ways to Boost Your Productivity" "ProductivityPro" "article,blog-title"

Available categories:
- article
- poster
- facebook-ad
- google-ad
- blog-title
- linkedin-post
- tweet
- instagram-caption
- email-subject
`)
    process.exit(1)
  }

  const [headline, brand, categoriesString] = parsed
  const categories = categoriesString.split(',').map(cat => cat.trim()) as HeadlineCategory[]

  return { headline, brand, categories }
}

const { headline, brand, categories } = parseCommandLineArgs()
console.log('Parsed arguments:', { headline, brand, categories })
addHeadline(headline, brand, categories) 