import mongoose from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  admin?: boolean;
  phoneNumber: string;
  acceptedTerms: boolean;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: function (value: string) {
        const phoneNumberPattern =
          /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
        return phoneNumberPattern.test(value);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
  },
  { collection: 'my-users' }
);

export const User: mongoose.Model<IUser> =
  mongoose.models['UserSchema'] || mongoose.model('UserSchema', UserSchema);
