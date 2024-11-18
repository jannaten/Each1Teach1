import * as Yup from 'yup';
import { emailDomains } from '../data';

const getEmailDomainRegex = (allowedDomains) => {
  const domainRegex = allowedDomains
    .map((domain) => domain.replace('.', '\\.'))
    .join('|');
  return new RegExp(`@(${domainRegex})$`);
};

const formatDomainList = (domains) => {
  return domains
    .map((domain) => `@${domain}`)
    .sort()
    .join(', ');
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .matches(
      getEmailDomainRegex(emailDomains),
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Yup.string().required('Password is required')
});

const languageSchema = Yup.object({
  language: Yup.string().required('Language is required'),
  credits: Yup.number()
    .required('Credits are required')
    .min(1, 'Credits must be at least 1')
    .max(5, 'Credits cannot exceed 5'),
  level: Yup.string()
    .required('Level is required')
    .oneOf(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'], 'Invalid level')
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: Yup.string()
    .required()
    .email()
    .matches(
      getEmailDomainRegex(emailDomains),
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Password must have at least 8 characters, including lowercase letters, uppercase letters, and a number'
    )
    .required('Password is required'),
  description: Yup.string()
    .min(0)
    .max(200, 'Description cannot exceed 200 characters'),
  languages_to_learn: Yup.array().of(languageSchema).default([]),
  languages_for_teach: Yup.array().of(languageSchema).default([])
});

export const userUpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: Yup.string()
    .required()
    .email()
    .matches(
      getEmailDomainRegex(emailDomains),
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    'Password must have at least 8 characters, including lowercase letters, uppercase letters, and a number'
  ),
  description: Yup.string()
    .min(0)
    .max(200, 'Description cannot exceed 200 characters'),
  roles: Yup.array()
    .of(Yup.string().oneOf(['superuser', 'student', 'teacher'], 'Invalid role'))
    .default(['student']),
  avatar: Yup.array()
    .of(
      Yup.string().oneOf(
        ['beam', 'marble', 'pixel', 'sunset', 'ring', 'bauhaus'],
        'Invalid avatar'
      )
    )
    .default(['beam']),
  approved: Yup.boolean(),
  expiresAt: Yup.date(),
  lastUserAccess: Yup.date(),
  images: Yup.mixed(),
  active: Yup.boolean(),
  images: Yup.string()
    .optional()
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid image ID'),
  languages_to_learn: Yup.array().of(languageSchema).default([]),
  languages_for_teach: Yup.array().of(languageSchema).default([])
});

export const newsSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  content: Yup.string()
    .required('Content is required')
    .max(2000, 'Content cannot exceed 2000 characters')
});
