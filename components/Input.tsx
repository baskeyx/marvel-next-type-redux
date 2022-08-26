import React from 'react';
import styles from '../styles/Input.module.scss';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => (
  <div className={`${styles.InputWrapper} ${props.value ? styles.Text : null}`}>
    <input id={label} className={styles.Input} {...props} />
    <label htmlFor={label} className={styles.InputLabel} >{label}</label>
  </div>
);

export default Input;