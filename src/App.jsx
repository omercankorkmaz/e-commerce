import React from 'react';
import { createUseStyles } from 'react-jss';
import './assets/styles/styles.scss';
import Main from './pages/Main';
import Navbar from './components/Header';

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
        },
    },
    app: {
        // height: '100vh',
        width: '100vw',
        backgroundColor: 'var(--primary-bg-color)',
        fontSize: '.875rem',
    },
});

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <Navbar />
            <Main />
        </div>
    );
};

export default App;
