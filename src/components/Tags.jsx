import React, { useEffect, useMemo } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    selectTable,
    setSearchForTags,
    setTagsToFilter,
} from '../redux/tableSlice';
import Product from '../models/product';
import Brand from '../models/brand';

const Tags = ({ products, brands }) => {
    const dispatch = useDispatch();
    const table = useSelector(selectTable);

    // if search input exists, looks for tags to match it,
    // depends on 'brands', 'original tags', and 'search input'
    const filteredTagsToFilter = useMemo(() => {
        if (table.searchForTags) {
            const newTagsToFilter = { ...table.tagsToFilter };
            Object.keys(newTagsToFilter).forEach((tag) => {
                if (tag !== 'All')
                    if (
                        !tag
                            .toLowerCase()
                            .includes(table.searchForTags.toLowerCase())
                    ) {
                        delete newTagsToFilter[tag];
                    }
            });
            return newTagsToFilter;
        }
        return table.tagsToFilter;
    }, [brands, table.tagsToFilter, table.searchForTags]);

    // collects tags from products which has selected type and produced by selected brands
    // depends on them and products array
    useEffect(() => {
        const tags = { All: { checked: true, number: 10 } };
        products.forEach((product) => {
            if (
                (table.productTypeToFilter
                    ? product.itemType === table.productTypeToFilter
                    : true) &&
                (table.brandsToFilter[0] === 'all' ||
                    table.brandsToFilter.includes(product.manufacturer))
            )
                product.tags.forEach((tag) => {
                    if (tags[tag] && tags[tag].number) tags[tag].number += 1;
                    else tags[tag] = { number: 1 };
                    tags[tag].checked = false;
                });
        });
        dispatch(setTagsToFilter(tags));
    }, [products, table.productTypeToFilter, table.brandsToFilter]);

    // get count of products for each tag
    const allProductNumbersForTags = useMemo(
        () =>
            products.filter(
                (product) =>
                    (table.productTypeToFilter
                        ? product.itemType === table.productTypeToFilter
                        : true) &&
                    (table.brandsToFilter[0] === 'all' ||
                        table.brandsToFilter.includes(product.manufacturer))
            ).length,
        [products, table.productTypeToFilter, table.brandsToFilter]
    );

    // select a tag handler
    const onSelectTagToFilter = (e) => {
        const tags = { ...table.tagsToFilter };
        if (tags.All.checked) {
            tags.All = { checked: false };
            Object.keys(tags).forEach((tag) => {
                tags[tag] = { ...tags[tag], checked: false };
            });
        }
        tags[e.value] = { ...tags[e.value], checked: e.checked };
        if (!e.checked) {
            const checkedTags = Object.keys(tags).filter(
                (tag) => tags[tag].checked
            );
            if (!checkedTags.length) {
                tags.All = { checked: true };
            }
        }
        dispatch(setTagsToFilter(tags));
    };

    // select all tags handler
    const onSelectAllTagsToFilter = (e) => {
        const tags = { ...table.tagsToFilter };
        if (e.checked) {
            tags.All = { checked: true };
            dispatch(setTagsToFilter(tags));
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
        <div className="setting-element">
            <span className="header">Tags</span>
            <div className="wrapper">
                <div className="search-wrapper">
                    <input
                        name="tagFiltering-search"
                        id="tagFiltering-search"
                        className="search"
                        type="text"
                        placeholder="Search Tag"
                        value={table.searchForTags}
                        onChange={(e) =>
                            dispatch(setSearchForTags(e.target.value))
                        }
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
                                              filteredTagsToFilter.All.checked
                                          ) && filteredTagsToFilter[tag].checked
                                }
                            />
                            <span htmlFor={tag} className="name-of-product">
                                {tag}&nbsp;
                            </span>
                            <span htmlFor={tag} className="count-of-product">
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
    );
};

Tags.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)).isRequired,
    brands: PropTypes.arrayOf(PropTypes.shape(Brand)).isRequired,
};

export default Tags;
