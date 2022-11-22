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

      const updated = await WeeklyArticle.findOneAndUpdate(
        { _id: id },
        { isActiveArticle: true }
      );
      const updatedRestDocs = await WeeklyArticle.updateMany(
        { _id: { $ne: id } },
        { isActiveArticle: false }
      );

      if (updated && updatedRestDocs) {
        return res.status(200).json({ success: true });
      }
    } catch (e) {
      return res.status(400).json(API_ERRORS.updateWeeklyArticleError);
    }
  }
}
