'use client';
import React from 'react';
import s from './loader.module.css';

const Spinner = () => {
  return (
    <div className={s.formPreloader}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Spinner;
