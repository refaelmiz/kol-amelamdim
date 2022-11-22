import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import connect from '../../db/connectMongo';

async function hashPassword(password) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connect();
      const { fullName, email, password, phoneNumber, acceptedTerms } =
        req.body;
      if (!validator.isEmail(email)) {
        return res.status(400).json(API_ERRORS.invalidEmailError);
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json(API_ERRORS.registrationEmailExistsError);
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        acceptedTerms,
      });

      if (!newUser) {
        return res.status(400).json(API_ERRORS.registrationError);
      }

      const token = jwt.sign(
        { email: req.body.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '365d' }
      );

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 365,
          sameSite: 'strict',
          path: '/',
        })
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json(API_ERRORS.registrationError);
    }
  }
}
