import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { add } from '../redux/basketSlice';
import ItemPhoto from '../assets/itemPhoto.png';
import Product from '../models/product';

const useStyles = createUseStyles({
    productCard: {
        height: '14.063rem',
        width: '7.75rem',
        // padding: '1.25rem',
    },
    productCardImageArea: {
        border: '1.17666px solid var(--image-frame-color)',
        borderRadius: '12px',
        height: '7.75rem',
    },
    productCardImage: {
        padding: '1rem',
    },
    productCardPrice: {
        marginBottom: '.5rem',
        color: 'var(--primary-color)',
        fontWeight: 700,
        fontSize: '.875rem',
        lineHeight: '1.25rem',
    },
    productCardName: {
        marginBottom: '.563rem',
        minHeight: '2.5rem',
        color: 'var(--product-name-color)',
        fontWeight: 600,
        fontSize: '.875rem',
        lineHeight: '1.25rem',
    },
    productCardAddButton: {
        width: '100%',
        height: '1.375rem',
        '& .p-button': {
            width: '100%',
            height: '100%',
            background: 'var(--primary-color)',
            borderRadius: '2px',
            '& span': {
                fontWeight: 600,
                fontSize: '.75rem',
                lineHeight: '1.25rem',
            },
        },
    },
});

const ProductCard = ({ product }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.productCard} data-testid="product-card">
            <div className={classes.productCardImageArea}>
                <img
                    src={ItemPhoto}
                    className={classes.productCardImage}
                    alt="Product"
                />
            </div>
            <div className={classes.productCardPrice}>₺ {product.price}</div>
            <div className={classes.productCardName}>{product.name}</div>
            <div
                className={classes.productCardAddButton}
                data-testid="product-add-button"
            >
                <Button
                    label="Add"
                    onClick={() =>
                        dispatch(
                            add({
                                slug: product.name,
                                unitPrice: product.price,
                            })
                        )
                    }
                />
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductCard;
