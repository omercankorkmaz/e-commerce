import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { selectBasket } from '../context/basketSlice';
import Basket from './Basket';
import BasketImage from '../assets/basket.svg';
import Logo from '../assets/Logo.png';

const useStyles = createUseStyles({
    header: {
        color: 'var(--primary-black)',
        backgroundColor: 'var(--primary-color)',
        width: '100%',
        height: '4.791rem',
        position: 'relative',
        textAlign: 'center',
    },
    logo: {
        width: '8.829rem',
        marginTop: '1.0625rem',
    },
    basketButton: {
        backgroundColor: 'var(--secondary-color)',
        height: '100%',
        fontFamily: 'Open Sans',
        fontSize: '.875rem',
        fontWeight: '600',
        lineHeight: '1.125rem',
        position: 'absolute',
        right: '6.5rem',
        width: '8.063rem',
        padding: 0,
        border: 0,
        cursor: 'pointer',
        '& .wrapper': {
            height: '1.533rem',
            display: 'flex',
            paddingLeft: '1.5rem',
            margin: 'auto',
            alignItems: 'center',
            '& span': {
                color: 'var(--primary-white)',
                WebkitTextStroke: '1px #000000',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                fontWeight: 'bold',
            },
            '& img': {
                width: '0.824rem',
                height: '1.022rem',
                marginRight: '.5rem',
            },
        },
    },
    basketOverlayPanel: {
        '&.p-overlaypanel': {
            right: '6.5rem',
            // left: 'unset !important',
            zIndex: 10,
            marginTop: '2.555rem',
            '&:before': {
                display: 'none',
            },
            '&:after': {
                display: 'none',
            },
        },
        '& .p-overlaypanel-content': {
            padding: 0,
        },
    },
});

const Header = () => {
    const classes = useStyles();
    const basket = useSelector(selectBasket);
    const basketOverlayPanel = useRef(null);

    return (
        <div className={classes.header}>
            <img className={classes.logo} src={Logo} alt="logo" />
            {/* <Button
                className={classes.basketButton}
                label={`₺ ${basket.totalPrice}`}
                loading={false}
                loadingIcon="pi pi-spin pi-sun"
                icon={<img src={Basket} alt="basket" />}
            /> */}
            <button
                type="button"
                className={classes.basketButton}
                onClick={(e) => basketOverlayPanel.current.toggle(e)}
            >
                <div className="wrapper">
                    <img src={BasketImage} alt="basket" />
                    <span>₺ {basket.totalPrice}</span>
                </div>
            </button>
            <OverlayPanel
                ref={basketOverlayPanel}
                className={classes.basketOverlayPanel}
            >
                <Basket />
            </OverlayPanel>
        </div>
    );
};

export default Header;
