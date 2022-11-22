import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const articles = await WeeklyArticle.find();

    if (articles.length) {
      return res.status(200).json(articles);
    } else {
      return res.status(404).json(null);
    }
  } catch (e) {
    return res.status(400).json(API_ERRORS.addWeeklyArticleError);
  }
}
