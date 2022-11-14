import React from 'react';
import { createUseStyles } from 'react-jss';
import './assets/styles/styles.scss';
import Main from './pages/Main';
import Navbar from './components/Header';
import Footer from './components/Footer';

const useStyles = createUseStyles({
    '@global': {
        body: {
            fontFamily: 'Open Sans !important',
        },
        '.p-component': {
            fontFamily: 'Open Sans !important',
        },
        '.p-button': {
            border: 0,
            backgroundColor: 'var(--primary-color)',
            '&:enabled:hover': {
                backgroundColor: 'var(--secondary-color)',
            },
        },
        '.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover': {
            backgroundColor: 'var(--secondary-color)',
        },
        '.p-radiobutton-box.p-highlight': {
            borderColor: 'var(--primary-color) !important',
            backgroundColor: 'var(--primary-white) !important',
        },
        '.p-checkbox .p-checkbox-box': {
            boxShadow: '0px 1px 7px rgba(93, 56, 192, 0.4)',
            borderRadius: '2px',
            border: 0,
            '&.p-highlight': {
                backgroundColor: 'var(--primary-color)',
            },
            '& .p-checkbox-icon': {
                fontSize: '0.688rem',
            },
        },
        '.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover':
            {
                backgroundColor: 'var(--primary-color)',
            },
        horizontalLine: {
            borderStyle: 'solid',
            borderColor: 'var(--horizontal-line-color)',
            borderWidth: '0px',
            borderBottomWidth: '2px',
            marginBottom: '1.149rem',
            marginTop: '1.022rem',
        },
    },
    app: {
        backgroundColor: 'var(--main-bg-color)',
        fontSize: '.875rem',
    },
});

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
};

export default App;
