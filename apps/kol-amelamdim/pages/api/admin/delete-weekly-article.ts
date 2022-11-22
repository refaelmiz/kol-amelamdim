import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body;
      const result = await WeeklyArticle.findOneAndDelete({ _id: id });

      if (result) {
        return res.status(200).json({ success: true });
      }
    } catch (e) {
      return res.status(400).json(API_ERRORS.deleteWeeklyArticleError);
    }
  }
}
