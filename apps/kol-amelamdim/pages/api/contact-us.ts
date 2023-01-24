import { NextApiRequest, NextApiResponse } from 'next';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { Lead } from '@kol-amelamdim/models';
import connect from '../../db/connectMongo';
import api from "../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { customerEmail, customerQuestion, from } = req.body;

  try {
    await api.post('https://courses.kol-amelamdim.co.il/wp-json/uap/v2/uap-30171-30172', {
      customerEmail: customerEmail,
      customerQuestion: customerQuestion,
      from,
    })
  } catch (e) {
    console.log(e);
  }

  try {
    await connect();

    const savedLead = await Lead.create({
      email: customerEmail,
      message: customerQuestion,
      from,
    });

    if (savedLead) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json(API_ERRORS.contactUsFormError);
  }
}
