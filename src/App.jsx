import React from 'react';
import { createUseStyles } from 'react-jss';
import './assets/global.css';
import Main from './pages/Main';
import Navbar from './components/Header';

const useStyles = createUseStyles({
    app: {
        height: '100vh',
        width: '100vw',
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
