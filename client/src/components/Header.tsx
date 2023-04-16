import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='header'>
        <Button
            variant="text"
            onClick={() => {
            navigate('/');
            }}
        >
            Home
        </Button>
        <Button
            variant="text"
            onClick={() => {
            navigate('/create');
            }}
        >
            Create
        </Button>
        </div>
    );
};
export default Header;
