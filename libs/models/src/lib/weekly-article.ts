import mongoose from 'mongoose';

interface WeeklyArticle {
  title: string;
  description: string;
  content: string;
  isActiveArticle?: boolean;
}

const WeeklyArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    isActiveArticle: { type: Boolean },
  },
  { collection: 'my-weekly-articles' }
);

export const WeeklyArticle: mongoose.Model<WeeklyArticle> =
  mongoose.models['WeeklyArticleSchema'] ||
  mongoose.model('WeeklyArticleSchema', WeeklyArticleSchema);
