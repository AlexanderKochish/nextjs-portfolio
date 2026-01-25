'use client';
import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const Modal = ({ isOpen, onClose, message }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isClient) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isClient]);

  if (!isClient) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={s.formModal}
      onClose={onClose}
      onClick={e => e.target === dialogRef.current && onClose()}
    >
      <div className={s.formModalContent}>
        <p className={s.formModalMessage}>{message}</p>
        <button className={s.formModalClose} onClick={onClose} autoFocus>
          OK
        </button>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
