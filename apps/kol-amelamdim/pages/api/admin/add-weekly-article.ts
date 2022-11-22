import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import connect from '../../../db/connectMongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, description, content, isActiveArticle } = req.body;

    try {
      await connect();
      const newArticle = await WeeklyArticle.create({
        title,
        description,
        content,
        isActiveArticle,
      });

      if (newArticle) {
        return res.status(200).json({ success: true });
      }
    } catch (e) {
      return res.status(400).json(API_ERRORS.addWeeklyArticleError);
    }
  }
}
