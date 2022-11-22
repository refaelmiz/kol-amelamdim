import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import connect from '../../db/connectMongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const activeArticle = await WeeklyArticle.findOne({
      isActiveArticle: true,
    });

    if (activeArticle) {
      return res.status(200).json(activeArticle);
    } else {
      return res.status(404).json(null);
    }
  } catch (e) {
    return res.status(400).json({ success: false });
  }
}
