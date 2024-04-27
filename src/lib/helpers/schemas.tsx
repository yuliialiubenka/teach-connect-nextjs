import * as Yup from 'yup';
import { emailRegexp } from './emailRegexp';
import { ERROR_MESSAGES } from './error-messages';

export const BookFormSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, ERROR_MESSAGES.MIN_NAME)
        .max(50, ERROR_MESSAGES.MAX_NAME)
        .required(ERROR_MESSAGES.REQUIRED_NAME),
    email: Yup.string()
        .matches(emailRegexp, ERROR_MESSAGES.INVALID_EMAIL)
        .required(ERROR_MESSAGES.REQUIRED_EMAIL),
    number: Yup.string()
        .min(16, ERROR_MESSAGES.MIN_PHONE)
        .required(ERROR_MESSAGES.REQUIRED_PHONE),
});

export const LogInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegexp, ERROR_MESSAGES.INVALID_EMAIL)
        .required(ERROR_MESSAGES.REQUIRED_EMAIL),
    password: Yup.string()
        .min(6, ERROR_MESSAGES.MIN_PASSWORD)
        .required(ERROR_MESSAGES.REQUIRED_PASSWORD),
});

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, ERROR_MESSAGES.MIN_NAME)
        .max(50, ERROR_MESSAGES.MAX_NAME)
        .required(ERROR_MESSAGES.REQUIRED_NAME),
    email: Yup.string()
        .matches(emailRegexp, ERROR_MESSAGES.INVALID_EMAIL)
        .required(ERROR_MESSAGES.REQUIRED_EMAIL),
    password: Yup.string()
        .min(6, ERROR_MESSAGES.MIN_PASSWORD)
        .required(ERROR_MESSAGES.REQUIRED_PASSWORD),
});