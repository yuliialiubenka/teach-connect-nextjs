'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';
import { addToken } from '../../redux/sliceAuth';
import { useDispatch } from 'react-redux';
import { ToastOptions, toast } from 'react-toastify';
import { styleToastify } from '../toastify/toastify';
import { LogInSchema } from '@/lib/helpers/schemas';
import styles from './auth.module.scss';

export default function LoginForm({ }) {
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (values: { email: string; password: string }) => {
        const { email, password } = values;

        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);

            const accessToken = await auth.currentUser?.getIdToken();

            if (accessToken) {
                dispatch(addToken(accessToken));
            }

            router.back();

            return credentials.user;
        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    toast.error('Incorrect email or password!', styleToastify as ToastOptions);
                    break;
                default:
                    toast.error('Oops! Something went wrong! Try reloading the page or make another choice!', styleToastify as ToastOptions);
                    break;
            }
            console.log(error.code);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Log In</h3>
            <p className={styles.description}>
                Welcome back! Please enter your credentials to access your account and
                continue your search for an teacher.
            </p>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LogInSchema}
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
                            className={styles.button}
                            type="submit"
                            disabled={isSubmitting}
                            onClick={() => handleSubmit()}
                        >
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
