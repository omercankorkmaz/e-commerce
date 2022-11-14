import React, { useEffect, useMemo, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
// import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { selectTable } from '../context/tableSlice';
import ProductCard from '../components/ProductCard';
import ArrowRight from '../assets/arrow-right.svg';
import ArrowLeft from '../assets/arrow-left.svg';
import Sorting from '../components/Sorting';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '6.5rem',
        marginRight: '6.5rem',
    },
    settingsSection: {
        flex: '0 0 auto',
        width: '18.5rem',
        marginTop: '2.398rem',
        marginRight: '1rem',
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
            padding: '0.1rem 1.875rem 0 0.1rem',
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
        '& .p-checkbox .p-checkbox-box': {
            boxShadow: '0px 1px 7px rgba(93, 56, 192, 0.4)',
            borderRadius: '2px',
            border: 0,
            '&.p-highlight': {
                backgroundColor: 'var(--primary-color)',
            },
            '& .p-checkbox-icon': {
                fontSize: '0.688rem',
            },
        },
        '& .p-radiobutton-box': {
            backgroundColor: 'var(--primary-white)',
            border: '2px solid var(--secondary-bg-color)',
            '&.p-highlight': {
                borderColor: 'var(--primary-color)',
                backgroundColor: 'var(--primary-white)',
            },
            '& .p-radiobutton-icon': {
                backgroundColor: 'var(--primary-white)',
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
});

const Main = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    const [searchForBrands, setSearchForBrands] = useState('');
    const [brandsToFilter, setBrandsToFilter] = useState([]);
    const [searchForTags, setSearchForTags] = useState('');
    const [tagsToFilter, setTagsToFilter] = useState({});

    const table = useSelector(selectTable);

    const [productTypeToFilter, setProductTypeToFilter] = useState('');

    const filteredBrands = useMemo(
        () =>
            searchForBrands
                ? brands.filter((brand) =>
                      brand.name
                          .toLowerCase()
                          .includes(searchForBrands.toLowerCase())
                  )
                : brands,
        [brands, searchForBrands]
    );

    const filteredTagsToFilter = useMemo(() => {
        if (searchForTags) {
            const newTagsToFilter = { ...tagsToFilter };
            Object.keys(newTagsToFilter).forEach((tag) => {
                if (tag !== 'All')
                    if (
                        !tag.toLowerCase().includes(searchForTags.toLowerCase())
                    ) {
                        delete newTagsToFilter[tag];
                    }
            });
            return newTagsToFilter;
        }
        return tagsToFilter;
    }, [brands, searchForBrands, tagsToFilter, searchForTags]);

    const productTypesToFilter = useMemo(
        () =>
            products.reduce((prevArr, currentEl) => {
                if (!prevArr.includes(currentEl.itemType))
                    prevArr.push(currentEl.itemType);
                return prevArr;
            }, []),
        [products, brandsToFilter]
    );

    useEffect(() => {
        const tags = { All: { checked: true, number: 10 } };
        products.forEach((product) => {
            if (
                (productTypeToFilter
                    ? product.itemType === productTypeToFilter
                    : true) &&
                (brandsToFilter[0] === 'all' ||
                    brandsToFilter.includes(product.manufacturer))
            )
                product.tags.forEach((tag) => {
                    if (tags[tag] && tags[tag].number) tags[tag].number += 1;
                    else tags[tag] = { number: 1 };
                    tags[tag].checked = false;
                });
        });
        setTagsToFilter(tags);
    }, [products, productTypeToFilter, brandsToFilter]);

    const filteredProducts = useMemo(() => {
        const allTagsActive = tagsToFilter.All && tagsToFilter.All.checked;
        return products.filter((product) => {
            const productTypeFilterPassed = productTypeToFilter
                ? product.itemType === productTypeToFilter
                : true;
            const brandsFilterPassed =
                brandsToFilter[0] === 'all' ||
                brandsToFilter.includes(product.manufacturer);

            let tagFilterPassed = allTagsActive;
            if (!allTagsActive) {
                tagFilterPassed =
                    product.tags.filter(
                        (tag) => tagsToFilter[tag] && tagsToFilter[tag].checked
                    ).length > 0;
            }

            return (
                productTypeFilterPassed && brandsFilterPassed && tagFilterPassed
            );
        });
    }, [products, productTypeToFilter, brandsToFilter, tagsToFilter]);

    const rows = 16;

    const productTemplate = (product) => (
        <ProductCard key={product.slug} product={product} />
    );

    const allProductNumbersForBrands = useMemo(
        () =>
            products.filter((product) =>
                productTypeToFilter
                    ? product.itemType === productTypeToFilter
                    : true
            ).length,
        [products, productTypeToFilter]
    );

    const allProductNumbersForTags = useMemo(
        () =>
            products.filter(
                (product) =>
                    (productTypeToFilter
                        ? product.itemType === productTypeToFilter
                        : true) &&
                    (brandsToFilter[0] === 'all' ||
                        brandsToFilter.includes(product.manufacturer))
            ).length,
        [products, productTypeToFilter, brandsToFilter]
    );

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
                        (productTypeToFilter
                            ? product.itemType === productTypeToFilter
                            : true) && product.manufacturer === company.slug
                ).length,
            }));
            setBrands(res);
            if (!brandsToFilter.length) setBrandsToFilter(['all']);

            setIsLoading(false);
        })();
    }, [products, productTypeToFilter]);

    useEffect(() => {
        (async () => {
            const productsResult = await (
                await fetch('http://127.0.0.1:3001/items')
            ).json();
            setProducts(productsResult.items);
        })();
    }, []);

    const onSelectBrandToFilter = (e) => {
        const selectedBrands = [...brandsToFilter];

        if (selectedBrands.indexOf('all') !== -1) {
            selectedBrands.splice(selectedBrands.indexOf('all'), 1);
        }
        if (e.checked) selectedBrands.push(e.value);
        else selectedBrands.splice(selectedBrands.indexOf(e.value), 1);

        if (selectedBrands.length === 0) selectedBrands.push('all');

        setBrandsToFilter(selectedBrands);
    };

    const onSelectAllBrandsToFilter = (e) => {
        if (e.checked) {
            setBrandsToFilter(['all']);
        }
    };

    const onSelectTagToFilter = (e) => {
        const tags = { ...tagsToFilter };
        if (tags.All.checked) {
            tags.All = { checked: false };
            Object.keys(tags).forEach((tag) => {
                tags[tag].checked = false;
            });
        }
        tags[e.value].checked = e.checked;
        if (!e.checked) {
            const checkedTags = Object.keys(tags).filter(
                (tag) => tags[tag].checked
            );
            if (!checkedTags.length) {
                tags.All = { checked: true };
            }
        }
        setTagsToFilter(tags);
    };

    const onSelectAllTagsToFilter = (e) => {
        const tags = { ...tagsToFilter };
        if (e.checked) {
            tags.All = { checked: true };
            setTagsToFilter(tags);
        }
    };

    const tagSelectHandler = (e) => {
        if (e.value === 'All') {
            onSelectAllTagsToFilter(e);
        } else {
            onSelectTagToFilter(e);
        }
    };

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
        <div className={classes.wrapper}>
            <div className={classes.settingsSection}>
                <Sorting />

                <span className="header">Brands</span>
                <div className="wrapper" style={{ marginBottom: '1.5rem' }}>
                    <div className="search-wrapper">
                        <input
                            name="brandFiltering-search"
                            id="brandFiltering-search"
                            className="search"
                            type="text"
                            placeholder="Search Brand"
                            value={searchForBrands}
                            onChange={(e) => setSearchForBrands(e.target.value)}
                        />
                    </div>
                    <div className="checkbox-wrapper">
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="all"
                                name="all"
                                value="all"
                                onChange={onSelectAllBrandsToFilter}
                                checked={brandsToFilter.indexOf('all') !== -1}
                            />
                            <span htmlFor="all" className="name-of-product">
                                All&nbsp;
                            </span>
                            <span htmlFor="all" className="count-of-product">
                                ({allProductNumbersForBrands})
                            </span>
                        </div>
                        {filteredBrands.map((brand) => (
                            <div key={brand.account} className="field-checkbox">
                                <Checkbox
                                    inputId={brand.account}
                                    name={brand.slug}
                                    value={brand.slug}
                                    onChange={onSelectBrandToFilter}
                                    checked={
                                        !brandsToFilter.includes('all') &&
                                        brandsToFilter.indexOf(brand.slug) !==
                                            -1
                                    }
                                />
                                <span
                                    htmlFor={brand.account}
                                    className="name-of-product"
                                >
                                    {brand.name}&nbsp;
                                </span>
                                <span
                                    htmlFor={brand.account}
                                    className="count-of-product"
                                >
                                    ({brand.noOfProduct})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <span className="header">Tags</span>
                <div className="wrapper">
                    <div className="search-wrapper">
                        <input
                            name="tagFiltering-search"
                            id="tagFiltering-search"
                            className="search"
                            type="text"
                            placeholder="Search Tag"
                            value={searchForTags}
                            onChange={(e) => setSearchForTags(e.target.value)}
                        />
                    </div>
                    <div className="checkbox-wrapper">
                        {Object.keys(filteredTagsToFilter).map((tag) => (
                            <div key={tag} className="field-checkbox">
                                <Checkbox
                                    inputId={tag}
                                    name={tag}
                                    value={tag}
                                    onChange={tagSelectHandler}
                                    checked={
                                        tag === 'All'
                                            ? filteredTagsToFilter.All.checked
                                            : !(
                                                  filteredTagsToFilter.All &&
                                                  filteredTagsToFilter.All
                                                      .checked
                                              ) &&
                                              filteredTagsToFilter[tag].checked
                                    }
                                />
                                <span htmlFor={tag} className="name-of-product">
                                    {tag}&nbsp;
                                </span>
                                <span
                                    htmlFor={tag}
                                    className="count-of-product"
                                >
                                    (
                                    {tag === 'All'
                                        ? allProductNumbersForTags
                                        : filteredTagsToFilter[tag].number}
                                    )
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={classes.tableSection}>
                <span className="table-header">Products</span>
                <SelectButton
                    className="product-tab"
                    value={productTypeToFilter}
                    options={productTypesToFilter}
                    onChange={(e) => {
                        setProductTypeToFilter(
                            e.target.value === null ? '' : e.target.value
                        );
                    }}
                />
                <DataView
                    className="product-table"
                    value={filteredProducts}
                    layout="grid"
                    itemTemplate={productTemplate}
                    rows={rows}
                    paginator
                    paginatorTemplate={paginatorTemplate}
                    loading={isLoading}
                    sortOrder={table.sorting.order}
                    sortField={table.sorting.field}
                />
            </div>
        </div>
    );
};

export default Main;
