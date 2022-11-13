import React, { useEffect, useMemo, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { selectBasket, add, remove } from '../context/basketSlice';
import ProductCard from '../components/ProductCard';
import Minus from '../assets/Minus.svg';
import Plus from '../assets/Plus.svg';

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
        '& .sorting-header': {
            color: 'var(--secondary-text-color)',
        },
        '& .sorting-wrapper': {
            marginTop: '.75rem',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--primary-white)',
            padding: '1.5rem',
            height: '11.5rem',
            borderRadius: '2px',
            '& .field-radiobutton:last-child': {
                marginBottom: 0,
            },
        },
        '& .brandFiltering-header': {
            marginTop: '1.5rem',
            color: 'var(--secondary-text-color)',
        },
        '& .brandFiltering-wrapper': {
            marginTop: '.75rem',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--primary-white)',
            padding: '0 0 1.5rem 0',
        },
        '& .brandFiltering-search-wrapper': {
            padding: '1.5rem 1.5rem 1.188rem 1.5rem',
            '& .brandFiltering-search': {
                height: '3rem',
                width: '100%',
                border: '2px solid var(--input-color)',
                borderRadius: '2px',
                color: 'var(--input-color)',
                '&::placeholder': {
                    padding: '0.75rem 0 0.75rem 1rem',
                    color: 'var(--input-color)',
                },
            },
        },
        '& .brandFiltering-checkbox-wrapper': {
            margin: '0 1.5rem 0 1.5rem',
            padding: '0 1.875rem 0 0',
            height: '8.875rem',
            overflowY: 'scroll',
            overflowX: 'hidden',
            '& .field-checkbox:last-child': {
                marginBottom: 0,
            },
            '& .field-checkbox': {
                '& .name-of-product': {
                    marginLeft: '.5rem',
                },
                '& .count-of-product': {
                    color: 'var(--count-color)',
                },
            },
        },
        '& .tagFiltering-header': {
            marginTop: '1.5rem',
            color: 'var(--secondary-text-color)',
        },
        '& .tagFiltering-wrapper': {
            marginTop: '.75rem',
            backgroundColor: 'var(--primary-white)',
            padding: '0 0 1.5rem 0',
        },
        '& .tagFiltering-search-wrapper': {
            padding: '1.5rem 1.5rem 1.188rem 1.5rem',
            '& .tagFiltering-search': {
                height: '3rem',
                width: '100%',
                border: '2px solid var(--input-color)',
                borderRadius: '2px',
                color: 'var(--input-color)',
                '&::placeholder': {
                    padding: '0.75rem 0 0.75rem 1rem',
                    color: 'var(--input-color)',
                },
            },
        },
        '& .tagFiltering-checkbox-wrapper': {
            margin: '0 1.5rem 0 1.5rem',
            padding: '0 1.875rem 0 0',
            height: '8.875rem',
            overflowY: 'scroll',
            overflowX: 'hidden',
            '& .field-checkbox:last-child': {
                marginBottom: 0,
            },
            '& .field-checkbox': {
                '& .name-of-product': {
                    marginLeft: '.5rem',
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
        },
    },
    basketSection: {
        flex: '0 0 auto',
        width: '18.5rem',
        marginLeft: '1rem',
        '& .basket-wrapper': {
            marginTop: '2.555rem',
            border: '.5rem solid var(--primary-color)',
            borderRadius: '2px',
            backgroundColor: 'var(--primary-white)',
            '& .products-wrapper': {
                padding: '1.661rem 1.688rem 0 1.375rem',
                // width: '14.438rem',
                '& .product-wrapper': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    // marginBottom: '1.149rem',
                    '& .product-amount-handlers': {
                        display: 'flex',
                        height: '2.044rem',
                        // '& .p-button:nth-child(1)': {
                        //     '& img': {
                        //         color: 'var(--primary-color)',
                        //         height: '0.128rem',
                        //         width: '0.625rem',
                        //     },
                        // },
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

const Main = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    const [searchForBrands, setSearchForBrands] = useState('');
    const [brandsToFilter, setBrandsToFilter] = useState([]);
    const [searchForTags, setSearchForTags] = useState('');
    const [tagsToFilter, setTagsToFilter] = useState({});

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

    const dispatch = useDispatch();
    const basket = useSelector(selectBasket);

    const sortingTypes = [
        { key: 'plh', name: 'Price low to high', field: 'price', order: 1 },
        { key: 'phl', name: 'Price high to low', field: 'price', order: -1 },
        { key: 'dno', name: 'New to old', field: 'added', order: -1 },
        { key: 'don', name: 'Old to new', field: 'added', order: 1 },
    ];

    const [selectedSortingType, setSelectedSortingType] = useState(
        sortingTypes[0]
    );

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
            const brandsResult = await (
                await fetch('http://127.0.0.1:3001/companies')
            ).json();
            const res = brandsResult.companies.map((company) => ({
                name: company.name,
                slug: company.slug,
                id: company.account,
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

    return (
        <div className={classes.wrapper}>
            <div className={classes.settingsSection}>
                <span className="sorting-header">Sorting</span>
                <div className="sorting-wrapper">
                    {sortingTypes.map((sortingType) => (
                        <div
                            key={sortingType.key}
                            className="field-radiobutton"
                        >
                            <RadioButton
                                inputId={sortingType.key}
                                name="sortingType"
                                value={sortingType}
                                onChange={(e) =>
                                    setSelectedSortingType(e.value)
                                }
                                checked={
                                    selectedSortingType.key === sortingType.key
                                }
                                // disabled={category.key === 'R'}
                            />
                            <label htmlFor={sortingType.key}>
                                {sortingType.name}
                            </label>
                        </div>
                    ))}
                </div>

                <span className="brandFiltering-header">Brands</span>
                <div className="brandFiltering-wrapper">
                    <div className="brandFiltering-search-wrapper">
                        <input
                            name="brandFiltering-search"
                            id="brandFiltering-search"
                            className="brandFiltering-search"
                            type="text"
                            placeholder="Search Brand"
                            value={searchForBrands}
                            onChange={(e) => setSearchForBrands(e.target.value)}
                        />
                    </div>
                    <div className="brandFiltering-checkbox-wrapper">
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
                            <div key={brand.id} className="field-checkbox">
                                <Checkbox
                                    inputId={brand.id}
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
                                    htmlFor={brand.id}
                                    className="name-of-product"
                                >
                                    {brand.name}&nbsp;
                                </span>
                                <span
                                    htmlFor={brand.id}
                                    className="count-of-product"
                                >
                                    ({brand.noOfProduct})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <span className="tagFiltering-header">Tags</span>
                <div className="tagFiltering-wrapper">
                    <div className="tagFiltering-search-wrapper">
                        <input
                            name="tagFiltering-search"
                            id="tagFiltering-search"
                            className="tagFiltering-search"
                            type="text"
                            placeholder="Search Tag"
                            value={searchForTags}
                            onChange={(e) => setSearchForTags(e.target.value)}
                        />
                    </div>
                    <div className="tagFiltering-checkbox-wrapper">
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
                                <span
                                    htmlFor={tag.id}
                                    className="name-of-product"
                                >
                                    {tag}&nbsp;
                                </span>
                                <span
                                    htmlFor={tag.id}
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
                    loading={isLoading}
                    sortOrder={selectedSortingType.order}
                    sortField={selectedSortingType.field}
                />
            </div>
            <div className={classes.basketSection}>
                <div className="basket-wrapper">
                    <div className="products-wrapper">
                        {Object.keys(basket.products).map((product) => (
                            <>
                                <div key={product} className="product-wrapper">
                                    <div className="product-name-and-price">
                                        <div className="product-name">
                                            {product}
                                        </div>
                                        <div className="product-price">
                                            ₺{' '}
                                            {basket.products[product].unitPrice}
                                        </div>
                                    </div>
                                    <div className="product-amount-handlers">
                                        <Button
                                            icon={
                                                <img src={Minus} alt="minus" />
                                            }
                                            className="p-button-text"
                                            onClick={() =>
                                                dispatch(
                                                    remove({
                                                        slug: product,
                                                        unitPrice:
                                                            basket.products[
                                                                product
                                                            ].unitPrice,
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
                                                            basket.products[
                                                                product
                                                            ].unitPrice,
                                                    })
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* eslint-disable-next-line react/self-closing-comp */}
                                <div className={classes.horizontalLine}></div>
                            </>
                        ))}
                    </div>
                    <div className="total-price-wrapper">
                        <div className="total-price">
                            <span>₺ {basket.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
