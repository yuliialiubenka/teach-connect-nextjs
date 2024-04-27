import React from 'react';
import Modal from '../../components/modal/modal';
import Register from '../../components/auth/register-form';

export default function Page() {
    return (
        <Modal show={true}>
            <Register />
        </Modal>
    )
}