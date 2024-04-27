import React from 'react';
import Modal from '../../components/modal/modal';
import LoginForm from '../../components/auth/login-form';

export default function Page() {
    return (
        <Modal show={true}>
            <LoginForm />
        </Modal>
    )
}