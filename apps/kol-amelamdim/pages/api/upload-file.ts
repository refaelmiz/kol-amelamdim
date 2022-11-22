import AWS from 'aws-sdk';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { File, User } from '@kol-amelamdim/models';
import { Category, FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { formatBytes } from '@kol-amelamdim/utils';
import connect from '../../db/connectMongo';
import jwt from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cookies } = req;
    const secret = cookies.token
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.ADMIN_TOKEN_SECRET;
    const { email } = jwt.verify(cookies.token || cookies.adminToken, secret);

    const user = await User.findOne({ email });

    const formData: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields } = formData;
    const selectedCategory = Category[fields.category];

    if (formData?.files?.sharedFile && selectedCategory) {
      // read file from the temporary path
      const fileSize = formatBytes(formData.files.sharedFile.size);
      const { mimetype } = formData.files.sharedFile;
      const fileType = mimetype.substring(
        mimetype.indexOf('/') + 1,
        mimetype.length
      );

      const contents = await fs.readFile(formData.files.sharedFile?.filepath);

      const s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      const fileLocation = `${selectedCategory}/${formData.files.sharedFile.originalFilename}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileLocation,
        Body: contents,
        ACL: 'public-read',
      };

      const returnedData = s3
        .upload(params, (err, _) => {
          if (err) {
            res.status(400).json(API_ERRORS.uploadFileError);
          }
        })
        .promise();
      return returnedData
        .then(async (response) => {
          await connect();
          await File.create({
            key: uuidv4(),
            category: selectedCategory,
            name: formData?.files?.sharedFile.originalFilename,
            size: fileSize,
            author: user?.fullName || 'לא ידוע',
            type: FILE_TYPES_DICTIONARY[fileType],
            URL: response.Location,
            approved: false,
          });

          res.status(200).json({ isUploaded: true });
        })
        .catch((e) => {
          res.status(400).json(API_ERRORS.unsupportedFileType);
        });
    } else {
      res.status(400).json(API_ERRORS.missingFieldsOnUploadFile);
    }
  }
}
