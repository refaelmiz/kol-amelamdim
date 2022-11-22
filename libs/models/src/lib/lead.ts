import mongoose from 'mongoose';
import validator from 'validator';

export type ILead = {
  email: string;
  message: string;
  from: string;
};

const LeadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: function (value: string) {
        return validator.isEmail(value);
      },
    },
    message: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
    from: {
      type: String,
      required: true,
    },
  },
  { collection: 'my-leads' }
);

export const Lead: mongoose.Model<ILead> =
  mongoose.models['LeadSchema'] || mongoose.model('LeadSchema', LeadSchema);
