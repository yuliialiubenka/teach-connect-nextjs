import React from 'react';
import { Pagination, styled } from '@mui/material';
import styles from './pagination.module.scss';
import { CustomPaginationProps } from '@/typings';

const CustomPagination = styled(Pagination)(({ }) => ({
    '& .MuiPagination-ul': {
        margin: '0 -16px'
    },
    '& .MuiPaginationItem-page': {
        color: '#121417',
    },
    '& .MuiPaginationItem-page:hover': {
        border: '2px solid  #FFDC86',
        backgroundColor: 'transparent',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
        backgroundColor: '#FFDC86',
        padding: '0',
        margin: '0 1px'
    },
    '& .MuiPaginationItem-ellipsis': {
        padding: '0',
        margin: '0'
    },
    '& .MuiPaginationItem-page.Mui-selected:hover': {
        backgroundColor: '#FFDC86',
        color: '#121417',
    },
    '& .MuiPaginationItem-previousNext, .MuiPaginationItem-firstLast': {
        padding: '0',
        margin: '0'
    },
    '& .MuiPaginationItem-previousNext:hover, .MuiPaginationItem-firstLast:hover': {
        backgroundColor: 'transparent',
        color: '#FFDC86',
    },
    '& .MuiPaginationItem-previousNext:focus, .MuiPaginationItem-firstLast:hover': {
        backgroundColor: 'transparent',
        color: '#FFDC86',
    },
    '& .MuiPaginationItem-previousNext:focus-visible, .MuiPaginationItem-firstLast:focus-visible': {
        backgroundColor: 'transparent',
        color: '#FFDC86',
    },
}));

const StyledPagination: React.FC<CustomPaginationProps> = ({ totalPages, currentPage, onChange }) => {
    return (
        <div className={styles.wrapper}>
            <CustomPagination
                count={totalPages}
                page={currentPage}
                onChange={onChange}
            />
        </div>
    );
};

export default StyledPagination;
