import mongoose from 'mongoose';
import { IFile, FileTypes } from '@kol-amelamdim/types';

const FilesSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validate: function (value: string) {
        return FileTypes.includes(value);
      },
    },
    URL: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
  },
  { collection: 'my-files' }
);

export const File: mongoose.Model<IFile> =
  mongoose.models['FilesSchema'] || mongoose.model('FilesSchema', FilesSchema);
