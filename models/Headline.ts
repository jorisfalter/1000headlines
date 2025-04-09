import mongoose from 'mongoose';

const HeadlineSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: [
      'Print',
      'Facebook Ad',
      'Blog',
      'Billboard',
      'Google Search Results'
    ]
  },
  title: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Headline || mongoose.model('Headline', HeadlineSchema); 