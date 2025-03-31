import mongoose from 'mongoose'

const HeadlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  categories: [{
    type: String,
    enum: [
      'article',
      'poster',
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

export default mongoose.models.Headline || mongoose.model('Headline', HeadlineSchema) 