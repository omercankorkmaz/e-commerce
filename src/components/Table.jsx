import React, { useMemo } from 'react';
import { DataView } from 'primereact/dataview';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTable } from '../redux/tableSlice';
import ProductCard from './ProductCard';
import ArrowRight from '../assets/arrow-right.svg';
import ArrowLeft from '../assets/arrow-left.svg';
import Product from '../models/product';

const useStyles = createUseStyles({
    table: {
        '& .product-table': {
            marginTop: '1rem',
            '& .p-dataview-content': {
                padding: '1.25rem',
                '& .grid': {
                    columnGap: '1.5rem',
                    rowGap: '1.25rem',
                },
            },
            '& .p-paginator': {
                margin: 'auto',
                marginTop: '.75rem',
                padding: 0,
                border: '0 !important',
                height: '2.5rem',
                width: '33.438rem',
                '& button': {
                    border: '0 !important',
                    color: 'var(--primary-color)',
                },
                '& .p-paginator-page.p-highlight': {
                    backgroundColor: 'var(--primary-color)',
                },
                '& .p-paginator-page:not(.p-highlight)': {
                    color: 'var(--secondary-text-color)',
                },
            },
        },
    },
    '@media (max-width: 768px)': {
        table: {
            '& .p-paginator': {
                width: 'auto !important',
                '& button': {
                    padding: '0.1rem',
                    margin: '0.1rem !important',
                },
            },
        },
    },
});

const Table = ({ products }) => {
    const classes = useStyles();
    const table = useSelector(selectTable);

    const filteredProducts = useMemo(() => {
        const allTagsActive =
            table.tagsToFilter.All && table.tagsToFilter.All.checked;
        return products.filter((product) => {
            const productTypeFilterPassed = table.productTypeToFilter
                ? product.itemType === table.productTypeToFilter
                : true;
            const brandsFilterPassed =
                table.brandsToFilter[0] === 'all' ||
                table.brandsToFilter.includes(product.manufacturer);

            let tagFilterPassed = allTagsActive;
            if (!allTagsActive) {
                tagFilterPassed =
                    product.tags.filter(
                        (tag) =>
                            table.tagsToFilter[tag] &&
                            table.tagsToFilter[tag].checked
                    ).length > 0;
            }

            return (
                productTypeFilterPassed && brandsFilterPassed && tagFilterPassed
            );
        });
    }, [
        products,
        table.productTypeToFilter,
        table.brandsToFilter,
        table.tagsToFilter,
    ]);

    const rows = 16;

    const productTemplate = (product) => (
        <ProductCard key={product.slug} product={new Product(product)} />
    );

    const prevPageLink = (options) => {
        const { className, onClick, disabled } = options;
        return (
            <button
                type="button"
                className={className}
                onClick={onClick}
                disabled={disabled}
                style={{ marginRight: '3.563rem' }}
            >
                <img
                    src={ArrowLeft}
                    alt="left-arrow"
                    style={{ marginRight: '.438rem' }}
                />
                <span style={{ paddingRight: '.438rem' }}>Prev</span>
            </button>
        );
    };

    const nextPageLink = (options) => {
        const { className, onClick, disabled } = options;
        return (
            <button
                type="button"
                className={className}
                onClick={onClick}
                disabled={disabled}
                style={{ marginLeft: '3.187rem' }}
            >
                <span
                    style={{ marginRight: '.313rem', paddingLeft: '.313rem' }}
                >
                    Next
                </span>
                <img src={ArrowRight} alt="right-arrow" />
            </button>
        );
    };

    const pageLinks = (options) => (
        <button
            type="button"
            className={options.className}
            onClick={options.onClick}
        >
            {options.page + 1}
        </button>
    );

    const paginatorTemplate = {
        layout: 'PrevPageLink PageLinks NextPageLink',
        PrevPageLink: prevPageLink,
        PageLinks: pageLinks,
        NextPageLink: nextPageLink,
    };

    return (
        <div className={classes.table}>
            <DataView
                className="product-table"
                value={filteredProducts}
                layout="grid"
                itemTemplate={productTemplate}
                rows={rows}
                paginator
                paginatorTemplate={paginatorTemplate}
                sortOrder={table.sorting.order}
                sortField={table.sorting.field}
            />
        </div>
    );
};

Table.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)).isRequired,
};

export default Table;
