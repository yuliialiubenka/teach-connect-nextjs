'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Formik } from 'formik';
import TextMaskCustom from '@/lib/helpers/numberMaskCustom';
import database, { auth } from '@/lib/firebase/firebase';
import { ref, set } from 'firebase/database';
import { ToastOptions, toast } from 'react-toastify';
import { styleToastify } from '../../toastify/toastify';
import { useRouter } from 'next/navigation';
import { BookFormProps } from '@/typings';
import { options } from '@/lib/options/book-form-options'
import { BookFormSchema } from '@/lib/helpers/schemas';
import styles from './book-modal.module.scss';

const BookForm: React.FC<BookFormProps> = ({ languages, teacherId }) => {
    const language = useSelector((state: any) => state.filter.name);
    const learning = language === '' ? languages.join(', ') : language;
    const user = auth.currentUser;
    const router = useRouter();

    const handleSubmit = (values: any) => {
        try {
            if (user) {
                const bookRef = ref(database, `/bookLesson/${teacherId}/${user.uid}/`);
                set(bookRef, values);
                toast.success('Form submitted successfully.', styleToastify as ToastOptions);
                router.back();
            }
        } catch (error) {
            toast.error('Error submitting form.', styleToastify as ToastOptions);
        }
    };

    return (
        <FormControl>
            <p className={styles.formTitle}>
                What is your main reason for learning {learning}?
            </p>
            <Formik
                initialValues={{
                    learning,
                    email: '',
                    fullName: '',
                    number: '',
                    lesson: options[0].name,
                }}
                validationSchema={BookFormSchema}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    isSubmitting,
                    handleBlur,
                    handleChange,
                    values,
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={values.lesson}
                            onChange={handleChange}
                            name="radio-buttons-group"
                            className={styles.radioGroup}
                        >
                            {options.map(({ name, id }) => (
                                <FormControlLabel
                                    key={id}
                                    value={name}
                                    name="lesson"
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#12141733',
                                                '&.Mui-checked': {
                                                    color: '#F4C550',
                                                },
                                            }}
                                        />
                                    }
                                    label={name}
                                />
                            ))}
                        </RadioGroup>
                        <div className={styles.inputsWrapper}>
                            <div className={styles.wrapperInput}>
                                <input
                                    type="text"
                                    name="fullName"
                                    onBlur={handleBlur}
                                    placeholder="Full Name"
                                    value={values.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && touched.fullName ? (
                                    <p className={styles.errorMessage}>* {errors.fullName}</p>
                                ) : null}
                            </div>
                            <div className={styles.wrapperInput}>
                                <input
                                    type="email"
                                    name="email"
                                    onBlur={handleBlur}
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email ? (
                                    <p className={styles.errorMessage}>* {errors.email}</p>
                                ) : null}
                            </div>
                            <div className={styles.wrapperInput}>
                                <TextMaskCustom
                                    name='number'
                                    type="tel"
                                    onBlur={handleBlur}
                                    placeholder="Phone number"
                                    onChange={handleChange}
                                    value={values.number}
                                />
                                {errors.number && touched.number ? (
                                    <p className={styles.errorMessage}>* {errors.number}</p>
                                ) : null}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.button}
                        >
                            Book
                        </button>
                    </form>
                )}
            </Formik>
        </FormControl>
    );
};

export default BookForm;
