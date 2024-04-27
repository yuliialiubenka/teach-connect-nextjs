import React from 'react';
import BookModal from '../../../../../components/teachers/book-modal/book-modal';
import Modal from '../../../../../components/modal/modal';
import { Params } from '@/typings';

export default async function Page({ params }: Params) {
  const { teacherId } = params;

  return (
    <Modal show={true}>
      <BookModal teacherId={teacherId} />
    </Modal>
  );
}

