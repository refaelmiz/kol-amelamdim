export enum Category {
  'parashat_shavoa' = 'parashat_shavoa',
  'learning_materials' = 'learning_materials',
  'mivhanim' = 'mivhanim',
  'art_and_activities' = 'art_and_activities',
  'shonot' = 'shonot',
}

type CategoriesUrl =
  | 'parashat_shavoa'
  | 'learning_materials'
  | 'mivhanim'
  | 'art_and_activities'
  | 'shonot';

export type CategoryObj = {
  URL: CategoriesUrl;
  en: string;
  he: string;
  icon: string;
};

export const Categories: CategoryObj[] = [
  {
    URL: 'parashat_shavoa',
    en: 'Parashat shavoa',
    he: 'פרשת השבוע',
    icon: '/images/icon-parashat-shavua.svg',
  },
  {
    URL: 'learning_materials',
    en: 'Learning materials',
    he: 'חומרי לימוד',
    icon: '/images/icon-homrey-limud.svg',
  },
  {
    URL: 'mivhanim',
    en: 'Mivhanim',
    he: 'מבחנים',
    icon: '/images/icon-mivhanim.svg',
  },
  {
    URL: 'art_and_activities',
    en: 'Art and activities',
    he: 'דפי יצירה ופעילות',
    icon: '/images/icon-dapey-ezira.svg',
  },
  {
    URL: 'shonot',
    en: 'Shonot',
    he: 'שונות',
    icon: '/images/icon-shonot.svg',
  },
];

export interface IFile {
  key: string;
  category: string;
  name: string;
  size: string;
  author: string;
  type: string;
  URL: string;
  approved: boolean;
}

export const FILE_TYPES_DICTIONARY = {
  all: 'all',
  pdf: 'pdf',
  png: 'png',
  jpeg: 'jpeg',
  msword: 'doc',
  'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  plain: 'txt',
};

export const FileTypes = ['pdf', 'png', 'jpeg', 'doc', 'docx', 'txt'];
