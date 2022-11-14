import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { selectTable, setBrandsToFilter } from '../redux/tableSlice';
import Sorting from '../components/Sorting';
import Brands from '../components/Brands';
import ProductTypes from '../components/ProductTypes';
import Tags from '../components/Tags';
import Table from '../components/Table';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 6.5rem',
    },
    settingsSection: {
        flex: '0 0 auto',
        width: '18.5rem',
        marginTop: '2.398rem',
        marginRight: '1rem',
        display: 'flex',
        flexDirection: 'column',
        '&.narrow-settings-section': {
            display: 'none',
        },
        '& .header': {
            marginTop: '1.5rem',
            color: 'var(--secondary-text-color)',
        },
        '& .wrapper': {
            marginTop: '.75rem',
            backgroundColor: 'var(--primary-white)',
            padding: '0 0 1.5rem 0',
        },
        '& .search-wrapper': {
            padding: '1.5rem 1.5rem 1.188rem 1.5rem',
            '& .search': {
                height: '3rem',
                width: '100%',
                border: '2px solid var(--input-color)',
                borderRadius: '2px',
                color: 'var(--input-color)',
                paddingLeft: '1rem',
                '&::placeholder': {
                    padding: '0.75rem 0 0.75rem 0',
                    color: 'var(--input-color)',
                },
            },
        },
        '& .checkbox-wrapper': {
            margin: '0rem 1.5rem 0 1.5rem',
            padding: '0.1rem 1.875rem 0 0.25rem',
            height: '8.875rem',
            overflowY: 'scroll',
            overflowX: 'hidden',
            '& .field-checkbox:last-child': {
                marginBottom: 0,
            },
            '& .field-checkbox': {
                '& .name-of-product': {
                    marginLeft: '.5rem',
                    fontSize: '.875rem',
                },
                '& .count-of-product': {
                    color: 'var(--count-color)',
                },
            },
        },
    },
    tableSection: {
        flex: '0 0 auto',
        width: '38rem',
        marginTop: '2.398rem',
        '& .table-header': {
            color: 'var(--ternary-text-color)',
            fontSize: '1.25rem',
        },
    },
    '@media (max-width: 1130px)': {
        wrapper: {
            margin: '0 3rem',
        },
    },
    '@media (max-width: 1030px)': {
        wrapper: {
            margin: '0 2.5rem',
        },
        settingsSection: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
            margin: '2rem 0 0 0',
            '& .setting-element': {
                flexGrow: 1,
                flexBasis: 0,
                margin: 0,
            },
            '& .sorting-header, .header': {
                marginLeft: '1.5rem',
                color: 'var(--primary-color)',
            },
        },
        tableSection: {
            width: '100%',
            marginTop: 0,
        },
    },
    '@media (max-width: 768px)': {
        wrapper: {
            margin: '0 1.5rem',
        },
        settingsSection: {
            margin: '1.5rem 0',
            '&.wide-settings-section': {
                display: 'none',
            },
            '&.narrow-settings-section': {
                display: 'block',
            },
        },
    },
    '@media (max-width: 640px)': {
        wrapper: {
            margin: '0 0.75rem',
        },
        settingsSection: {
            margin: '1rem 0',
            '&.wide-settings-section': {
                display: 'none',
            },
            '&.narrow-settings-section': {
                display: 'block',
            },
        },
    },
    '@media (max-width: 480px)': {
        wrapper: {
            margin: '0 0.25rem',
        },
        settingsSection: {
            margin: '0.75rem 0',
            '&.wide-settings-section': {
                display: 'none',
            },
            '&.narrow-settings-section': {
                display: 'block',
            },
        },
    },
    overlayPanel: {
        zIndex: 100,
        maxHeight: '50vh',
        overflow: 'auto',
        border: '.1rem solid var(--primary-color)',
        borderRadius: '2px',
        '&.settings-section-in-overlay': {
            width: 'auto',
            marginTop: '10px',
            '& .wrapper': {
                margin: '0 !important',
                padding: '0 !important',
            },
        },
        '& .setting-element': {
            height: '100%',
            margin: 0,
            '& .header, .sorting-header': {
                display: 'none',
            },
            '& .sorting-wrapper': {
                padding: 0,
                margin: 0,
                height: '100%',
            },
            '& .checkbox-wrapper': {
                '& .field-checkbox:last-child': {
                    marginBottom: 0,
                },
            },
        },
    },
    basketButton: {
        '& .p-button-label': {
            color: 'var(--primary-color)',
        },
    },
});

const Main = () => {
    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    const dispatch = useDispatch();
    const table = useSelector(selectTable);

    const sortingOverlayPanel = useRef(null);
    const brandsOverlayPanel = useRef(null);
    const tagsOverlayPanel = useRef(null);

    useEffect(() => {
        (async () => {
            let brandsResult;
            if (brands.length) {
                brandsResult = [...brands];
            } else {
                brandsResult = (
                    await (
                        await fetch('http://127.0.0.1:3001/companies')
                    ).json()
                ).companies;
            }
            const res = brandsResult.map((company) => ({
                name: company.name,
                slug: company.slug,
                account: company.account,
                noOfProduct: products.filter(
                    (product) =>
                        (table.productTypeToFilter
                            ? product.itemType === table.productTypeToFilter
                            : true) && product.manufacturer === company.slug
                ).length,
            }));
            setBrands(res);
            if (!table.brandsToFilter.length)
                dispatch(setBrandsToFilter(['all']));
        })();
    }, [products, table.productTypeToFilter]);

    useEffect(() => {
        (async () => {
            const productsResult = await (
                await fetch('http://127.0.0.1:3001/items')
            ).json();
            setProducts(productsResult.items);
        })();
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.settingsSection} wide-settings-section`}>
                <Sorting />
                <Brands products={products} brands={brands} />
                <Tags products={products} brands={brands} />
            </div>
            <div
                className={`${classes.settingsSection} narrow-settings-section`}
            >
                <Button
                    type="button"
                    className={`${classes.basketButton} p-button-text`}
                    onClick={(e) => sortingOverlayPanel.current.toggle(e)}
                    label="Sorting"
                />
                <OverlayPanel
                    ref={sortingOverlayPanel}
                    className={`${classes.overlayPanel} ${classes.settingsSection} settings-section-in-overlay`}
                >
                    <Sorting />
                </OverlayPanel>
                <Button
                    type="button"
                    className={`${classes.basketButton} p-button-text`}
                    onClick={(e) => brandsOverlayPanel.current.toggle(e)}
                    label="Brands"
                />
                <OverlayPanel
                    ref={brandsOverlayPanel}
                    className={`${classes.overlayPanel} ${classes.settingsSection} settings-section-in-overlay`}
                >
                    <Brands products={products} brands={brands} />
                </OverlayPanel>
                <Button
                    type="button"
                    className={`${classes.basketButton} p-button-text`}
                    onClick={(e) => tagsOverlayPanel.current.toggle(e)}
                    label="Tags"
                />
                <OverlayPanel
                    ref={tagsOverlayPanel}
                    className={`${classes.overlayPanel} ${classes.settingsSection} settings-section-in-overlay`}
                >
                    <Tags products={products} brands={brands} />
                </OverlayPanel>
            </div>
            <div className={classes.tableSection}>
                <span className="table-header">Products</span>
                <ProductTypes products={products} />
                <Table products={products} />
            </div>
        </div>
    );
};

export default Main;
