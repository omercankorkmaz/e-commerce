import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
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
            <div className={classes.productCardAddButton}>Add</div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductCard;
