import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        color: 'var(--primary-color)',
        fontSize: '0.813rem',
        height: '1.438rem',
        textAlign: 'center',
        marginTop: '8.5rem',
    },
});

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <span>©2019 Market</span>
            <span style={{ margin: '0 1rem' }}>•</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
        </div>
    );
};

export default Footer;
