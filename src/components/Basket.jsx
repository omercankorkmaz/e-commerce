import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, add, remove } from '../context/basketSlice';
import Minus from '../assets/Minus.svg';
import Plus from '../assets/Plus.svg';

const useStyles = createUseStyles({
    basket: {
        flex: '0 0 auto',
        width: '18.5rem',
        '& .basket-wrapper': {
            border: '.5rem solid var(--primary-color)',
            borderRadius: '2px',
            backgroundColor: 'var(--primary-white)',
            '& .products-wrapper': {
                padding: '1.661rem 1.688rem 0 1.375rem',
                maxHeight: '40rem',
                overflow: 'auto',
                '& .product-wrapper': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& .product-amount-handlers': {
                        display: 'flex',
                        height: '2.044rem',
                        '& .p-button': {
                            '& img': {
                                color: 'var(--primary-color)',
                                height: '0.639rem',
                                width: '0.639rem',
                            },
                        },
                        '& .product-amount': {
                            height: '100%',
                            width: '1.875rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--primary-white)',
                        },
                    },
                    '& .product-name-and-price': {
                        '& .product-price': {
                            color: 'var(--primary-color)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            lineHeight: '1.125rem',
                            marginTop: '0.256rem',
                        },
                        '& .product-name': {
                            fontWeight: 400,
                            fontSize: '0.875rem',
                            lineHeight: '1.125rem',
                        },
                    },
                },
            },
            '& .total-price-wrapper': {
                '& .total-price': {
                    width: '5.75rem',
                    height: '3.194rem',
                    marginLeft: '10.75rem',
                    marginRight: '1rem',
                    marginBottom: '1.022rem',
                    border: '3px solid var(--primary-color)',
                    borderRadius: '2px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    lineHeight: '1rem',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            },
        },
    },
    horizontalLine: {
        borderStyle: 'solid',
        borderColor: 'var(--horizontal-line-color)',
        borderWidth: '0px',
        borderBottomWidth: '2px',
        marginBottom: '1.149rem',
        marginTop: '1.022rem',
    },
});

const Basket = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const basket = useSelector(selectBasket);

    return (
        <div className={classes.basket}>
            <div className="basket-wrapper">
                <div className="products-wrapper">
                    {Object.keys(basket.products).map((product) => (
                        <div key={product}>
                            <div className="product-wrapper">
                                <div className="product-name-and-price">
                                    <div className="product-name">
                                        {product}
                                    </div>
                                    <div className="product-price">
                                        ₺ {basket.products[product].unitPrice}
                                    </div>
                                </div>
                                <div className="product-amount-handlers">
                                    <Button
                                        icon={<img src={Minus} alt="minus" />}
                                        className="p-button-text"
                                        onClick={() =>
                                            dispatch(
                                                remove({
                                                    slug: product,
                                                    unitPrice:
                                                        basket.products[product]
                                                            .unitPrice,
                                                })
                                            )
                                        }
                                    />
                                    <div className="product-amount">
                                        {basket.products[product].amount}
                                    </div>
                                    <Button
                                        icon={<img src={Plus} alt="plus" />}
                                        className="p-button-text"
                                        onClick={() =>
                                            dispatch(
                                                add({
                                                    slug: product,
                                                    unitPrice:
                                                        basket.products[product]
                                                            .unitPrice,
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={classes.horizontalLine} />
                        </div>
                    ))}
                </div>
                <div className="total-price-wrapper">
                    <div className="total-price">
                        <span>₺ {basket.totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;
