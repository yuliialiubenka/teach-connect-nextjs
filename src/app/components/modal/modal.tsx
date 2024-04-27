'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styles from './modal.module.scss';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalProps } from '@/typings';

export default function Modal({ show, children }: ModalProps) {
  const router = useRouter();

  return (
    <Transition.Root as={Fragment} show={show}>
      <Dialog
        as="div"
        className={styles.overlay}
        onClose={() => router.back()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.overlayBg} />
        </Transition.Child>
        <Dialog.Panel className={styles.dialogPanel}>
          <button className={styles.closeButton} onClick={() => router.back()}>
            <AiOutlineClose className={styles.closeIcon} />
          </button>
          <div className={styles.dialogWrap}>
            {children}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
}
