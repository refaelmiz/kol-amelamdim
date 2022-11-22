import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const article = await WeeklyArticle.findById({ _id: id });

      if (article) {
        return res.status(200).json(article);
      }
    } catch (e) {
      return res.status(400).json(API_ERRORS.getArticleByIdError);
    }
  }
}
