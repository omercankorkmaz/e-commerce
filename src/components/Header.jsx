import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from 'primereact/button';
import Basket from '../assets/basket.svg';

const useStyles = createUseStyles({
    header: {
        color: '#FFFFFF',
        backgroundColor: '#1EA4CE',
        width: '100%',
        height: '5rem',
        // margin: {
        //     top: 5,
        //     right: 0,
        //     bottom: 0,
        //     left: '1rem',
        // },
        // '& span': {
        //     fontWeight: 'bold',
        // },
    },
    basketButton: {
        backgroundColor: '#147594',
        height: '100%',
        fontFamily: 'Open Sans',
        fontSize: '.875rem',
        fontWeight: '600',
    },
});

/*
    //styleName: Body / Short 01 - SemiBold;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.1599999964237213px;
    text-align: left;

*/

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <Button
                className={classes.basketButton}
                label="INITIAL"
                loading={false}
                loadingIcon="pi pi-spin pi-sun"
                icon={<img src={Basket} alt="basket" />}
            />
        </div>
    );
};

export default Header;
