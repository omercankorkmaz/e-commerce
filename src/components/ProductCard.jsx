import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { add, selectBasket } from '../context/basketSlice';
import ItemPhoto from '../assets/itemPhoto.png';

export class Product {
    tags;

    price;

    name;

    description;

    slug;

    added;

    manufacturer;

    itemType;
}

const useStyles = createUseStyles({
    navbar: {
        color: '#FFFFFF',
        backgroundColor: '#1EA4CE',
        width: '100%',
        height: '5rem',
    },
    basketButton: {
        backgroundColor: '#147594',
        height: '100%',
        fontFamily: 'Open Sans',
        fontSize: '.875rem',
        fontWeight: '600',
    },
});

const ProductCard = ({ product }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const basket = useSelector(selectBasket);

    useEffect(() => {
        console.log(basket);
    });

    return (
        <div className={classes.productCard}>
            <div className={classes.productCardImageArea}>
                <img
                    src={ItemPhoto}
                    className={classes.itemCardImage}
                    alt="Product"
                />
            </div>
            <div className={classes.productCardPrice}>{product.price}</div>
            <div className={classes.productCardName}>{product.name}</div>
            <div className={classes.productCardAddButton}>
                <Button
                    label="Add"
                    onClick={() => dispatch(add({ slug: product.slug }))}
                />
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductCard;
