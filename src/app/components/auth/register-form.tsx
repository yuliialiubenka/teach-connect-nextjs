'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase/firebase';
import { addToken } from '../../redux/sliceAuth';
import { useDispatch } from 'react-redux';
import { ToastOptions, toast } from 'react-toastify';
import { styleToastify } from '../toastify/toastify';
import { RegisterSchema } from '@/lib/helpers/schemas';
import styles from './auth.module.scss';

export default function RegisterForm({ }) {
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (values: { email: string; password: string }) => {
        const { email, password } = values;
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);

            const accessToken = await auth.currentUser?.getIdToken();

            if (accessToken) {
                dispatch(addToken(accessToken));
            }

            router.back();

            toast.success('Registration completed successfully.', styleToastify as ToastOptions);

            return credentials;
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use.', styleToastify as ToastOptions);
            } else {
                toast.error('Oops! Something went wrong! Try reloading the page or make another choice!', styleToastify as ToastOptions);
            }
        }
    };

    return (
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Registration</h3>
            <p className={styles.description}>
                Thank you for your interest in our platform! In order to register, we
                need some information. Please provide us with the following information
            </p>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={styles.inputWrapper}>
                            <Field
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="name"
                                component="div"
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <Field
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="email"
                                component="div"
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <div className={styles.passwordWrapper}>
                                <Field
                                    className={styles.input}
                                    name="password"
                                    type={visibility ? 'text' : 'password'}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className={styles.passwordVisibility}
                                    onClick={() => setVisibility(!visibility)}
                                >
                                    {visibility ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="password"
                                component="div"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.button}
                            onClick={() => handleSubmit()}
                        >
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
