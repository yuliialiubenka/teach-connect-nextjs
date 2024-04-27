'use client';

import styles from './filter.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, query, orderByChild, onValue } from 'firebase/database';
import { FormControl, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import { AiOutlineReload } from 'react-icons/ai';
import { addFilter, addFilterName, deleteFilter } from '../../../redux/sliceFilter';
import { languages, levels, price } from '@/lib/options/filter-options';
import database from '@/lib/firebase/firebase';
import { setSelectedLevels } from '../../../redux/sliceFilter';
import { ItemState } from '@/typings';

const StyledSelect = styled(Select)(() => ({
  fontFamily: '"Roboto", sans-serif',
  borderRadius: '14px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:focus-visible .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiPopover-root.MuiMenu-root > div': {
    marginTop: '4px',
    borderRadius: '12px'
  }
}));

export default function Filter({ }) {
  const dispatch = useDispatch();
  const dbRef = ref(database, 'teachers');

  const [options, setOptions] = useState({
    language: '',
    levels: '',
    price: '',
  });

  const [item, setItem] = useState<ItemState>({
    language: [],
    levels: [],
  });

  const clearFilter = () => {
    setOptions({
      language: '',
      levels: '',
      price: '',
    });

    return dispatch(deleteFilter());
  };

  const handleClickLanguage = (ev: SelectChangeEvent<string | unknown>) => {
    console.log(ev.type);
    const selectedLanguage = ev.target.value as string;
    setOptions(prev => ({ ...prev, language: selectedLanguage }));

    const q = query(dbRef, orderByChild('languages'));

    if (options.language !== selectedLanguage) {
      setOptions(prev => ({ ...prev, price: '', levels: '' }));
    }

    onValue(q, snapshot => {
      const teachers = snapshot.val();

      const language = Object.keys(teachers)
        .filter(key => teachers[key].languages.includes(selectedLanguage))
        .map(key => ({ ...teachers[key] }));

      setItem(prev => ({ ...prev, language }));

      dispatch(addFilterName(selectedLanguage));
      dispatch(addFilter(language));
      dispatch(setSelectedLevels(''));
      return;
    });
  };

  const handleClickLanguageLevel = (ev: SelectChangeEvent<string | unknown>) => {
    const selectedLevels = ev.target.value as string;
    setOptions(prev => ({ ...prev, levels: selectedLevels }));

    if (options.price !== '') {
      setOptions(prev => ({ ...prev, price: '' }));
    }

    if (selectedLevels === '') {
      const levels = item.language;

      dispatch(addFilter(levels));
      dispatch(setSelectedLevels(selectedLevels));
      return;
    }

    const levels = item.language.filter((teacher: any) =>
      teacher.levels.includes(selectedLevels)
    );

    setItem(prev => ({ ...prev, levels }));

    dispatch(addFilter(levels));
    dispatch(setSelectedLevels(selectedLevels));
    return;
  };

  const handleClickPrice = (ev: SelectChangeEvent<string | unknown>) => {
    const selectedPrice = ev.target.value as string;
    setOptions(prev => ({ ...prev, price: selectedPrice }));

    const filterByLevel =
      item.levels.length !== 0 ? item.levels : item.language;

    const teachers = filterByLevel.filter(
      (teacher: any) => teacher.price_per_hour >= Number(selectedPrice)
    );

    const teacherSort = [...teachers].sort(
      (a: any, b: any) => a.price_per_hour - b.price_per_hour
    );

    return dispatch(addFilter(teacherSort));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <FormControl className={styles.formControl} sx={{ marginRight: '20px', minWidth: 221 }} size="small">
          <p className={styles.title}>Languages</p>
          <StyledSelect
            className={styles.select}
            value={options.language}
            onChange={handleClickLanguage}
            displayEmpty
            inputProps={{ 'aria-label': 'All languages' }}
            sx={{ color: options.language === '' ? '#8A8A89' : '#121417', }}
          >
            <MenuItem value="">
              <em className={styles.em}>All languages</em>
            </MenuItem>
            {languages.map((option, index) => (
              <MenuItem value={option.name} key={index}>
                <em className={styles.em}>{option.name}</em>
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <FormControl className={styles.formControl} sx={{ marginRight: '20px', minWidth: 198 }} size="small">
          <p className={styles.title}>Level of knowledge</p>
          <StyledSelect
            className={styles.select}
            value={options.levels}
            onChange={handleClickLanguageLevel}
            disabled={options.language === ''}
            displayEmpty
            inputProps={{ 'aria-label': 'A1-C2' }}
            sx={{ color: options.levels === '' ? '#8A8A89' : '#121417', }}
          >
            <MenuItem value="">
              <em className={styles.em}>A1-C2</em>
            </MenuItem>
            {levels.map((option, index) => (
              <MenuItem value={option.name} key={index}>
                <em className={styles.em}>{option.name}</em>
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <div className={styles.formControlWrap}>
          <FormControl className={styles.formControl} sx={{ minWidth: 124 }} size="small">
            <p className={styles.title}>Price</p>
            <StyledSelect
              className={styles.select}
              value={options.price}
              onChange={handleClickPrice}
              disabled={options.language === ''}
              displayEmpty
              inputProps={{ 'aria-label': 'From' }}
              sx={{ color: options.price === '' ? '#8A8A89' : '#121417', }}
            >
              <MenuItem value="" disabled>
                <em className={styles.em}>From</em>
              </MenuItem>
              {price.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  <em className={styles.em}>{option.value}</em>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
          {Object.values(options).join('') !== '' && (
            <button className={styles.button} type="button" onClick={clearFilter}>
              <AiOutlineReload />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
