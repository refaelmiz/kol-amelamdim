import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('token', '', {
        expires: new Date(0),
        path: '/',
      }),
      cookie.serialize('adminToken', '', {
        expires: new Date(0),
        path: '/',
      }),
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json(API_ERRORS.GeneralError);
  }
};
