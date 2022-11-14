import React, { useMemo } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTable, setProductTypeToFilter } from '../context/tableSlice';
import Product from '../models/product';

const useStyles = createUseStyles({
    productTypes: {
        '& .product-tab': {
            color: 'var(--ternary-text-color)',
            marginTop: '1rem',
            '& .p-button': {
                height: '1.875rem',
                border: 'none',
                backgroundColor: 'var(--ternary-bg-color)',
                color: 'var(--primary-color)',
                marginRight: '.5rem',
                borderRadius: '2px',
                fontWeight: '600',
                fontSize: '.813rem',
                lineHeight: '1.125rem',
                padding: 0,
                '& span': {
                    padding: '.375rem 1rem',
                },
                '&.p-highlight': {
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--ternary-bg-color)',
                },
            },
        },
    },
});

const ProductTypes = ({ products }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const table = useSelector(selectTable);

    const productTypesToFilter = useMemo(
        () =>
            products.reduce((prevArr, currentEl) => {
                if (!prevArr.includes(currentEl.itemType))
                    prevArr.push(currentEl.itemType);
                return prevArr;
            }, []),
        [products, table.brandsToFilter]
    );

    return (
        <div className={classes.productTypes}>
            <SelectButton
                className="product-tab"
                value={table.productTypeToFilter}
                options={productTypesToFilter}
                onChange={(e) =>
                    dispatch(
                        setProductTypeToFilter(
                            e.target.value === null ? '' : e.target.value
                        )
                    )
                }
            />
        </div>
    );
};

ProductTypes.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)).isRequired,
};

export default ProductTypes;
