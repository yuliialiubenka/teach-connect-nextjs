import React, { useState, ChangeEvent } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { styled } from '@mui/material';
import { ChangeHandler, TextMaskCustomProps } from '@/typings';

const StyledMuiTelInput = styled(MuiTelInput)(() => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(18, 20, 23, 0.1)',
    borderRadius: '12px',
  },
  '.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(18, 20, 23, 0.1)',
  },
  '.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f4c550',
    borderWidth: '1px',
  },
}));

const TextMaskCustom: React.FC<TextMaskCustomProps> = ({ onChange, name, placeholder = '', ...other }) => {
  const [phone, setPhone] = useState<string>('');

  const handleChange: ChangeHandler = (newPhone) => {
    setPhone(newPhone);
    onChange({ target: { name, value: newPhone } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <StyledMuiTelInput
      {...other}
      value={phone}
      onChange={handleChange}
      defaultCountry={'UA'}
      fullWidth
      name={name}
      autoComplete="tel"
    />
  );
};

export default TextMaskCustom;
