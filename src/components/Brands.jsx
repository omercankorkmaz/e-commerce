import React, { useMemo } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    selectTable,
    setBrandsToFilter,
    setSearchForBrands,
} from '../redux/tableSlice';
import Product from '../models/product';
import Brand from '../models/brand';

const Brands = ({ products, brands }) => {
    const dispatch = useDispatch();
    const table = useSelector(selectTable);

    // filter brands according to search input
    const filteredBrands = useMemo(
        () =>
            table.searchForBrands
                ? brands.filter((brand) =>
                      brand.name
                          .toLowerCase()
                          .includes(table.searchForBrands.toLowerCase())
                  )
                : brands,
        [brands, table.searchForBrands]
    );

    // get count of products for each brand
    const allProductNumbersForBrands = useMemo(
        () =>
            products.filter((product) =>
                table.productTypeToFilter
                    ? product.itemType === table.productTypeToFilter
                    : true
            ).length,
        [products, table.productTypeToFilter]
    );

    // select a brand handler
    const onSelectBrandToFilter = (e) => {
        const selectedBrands = [...table.brandsToFilter];

        if (selectedBrands.indexOf('all') !== -1) {
            selectedBrands.splice(selectedBrands.indexOf('all'), 1);
        }
        if (e.checked) selectedBrands.push(e.value);
        else selectedBrands.splice(selectedBrands.indexOf(e.value), 1);

        if (selectedBrands.length === 0) selectedBrands.push('all');

        dispatch(setBrandsToFilter(selectedBrands));
    };

    // select all brands handler
    const onSelectAllBrandsToFilter = (e) => {
        if (e.checked) {
            dispatch(setBrandsToFilter(['all']));
        }
    };

    return (
        <div className="setting-element">
            <span className="header">Brands</span>
            <div className="wrapper" style={{ marginBottom: '1.5rem' }}>
                <div className="search-wrapper">
                    <input
                        name="brandFiltering-search"
                        id="brandFiltering-search"
                        className="search"
                        type="text"
                        placeholder="Search Brand"
                        value={table.searchForBrands}
                        onChange={(e) =>
                            dispatch(setSearchForBrands(e.target.value))
                        }
                    />
                </div>
                <div className="checkbox-wrapper">
                    <div className="field-checkbox">
                        <Checkbox
                            inputId="all"
                            name="all"
                            value="all"
                            onChange={onSelectAllBrandsToFilter}
                            checked={table.brandsToFilter.indexOf('all') !== -1}
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
                                    !table.brandsToFilter.includes('all') &&
                                    table.brandsToFilter.indexOf(brand.slug) !==
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
        </div>
    );
};

Brands.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)).isRequired,
    brands: PropTypes.arrayOf(PropTypes.shape(Brand)).isRequired,
};

export default Brands;
