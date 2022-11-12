import React, { useEffect, useMemo, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { useSelector } from 'react-redux';
import { selectBasket } from '../context/basketSlice';
import ProductCard from '../components/ProductCard';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandsToFilter, setBrandsToFilter] = useState([]);
    const [productTypeToFilter, setProductTypeToFilter] = useState('');
    const [tagsToFilter, setTagsToFilter] = useState({});
    // const dispatch = useDispatch();
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
        <ProductCard key={product.added} product={product} />
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
        <div className="main" style={{ display: 'flex' }}>
            <div>
                {Object.keys(basket).map((product) => (
                    <div>
                        {product} {basket[product]}
                    </div>
                ))}
            </div>
            <div>
                {sortingTypes.map((sortingType) => (
                    <div key={sortingType.key} className="field-radiobutton">
                        <RadioButton
                            inputId={sortingType.key}
                            name="sortingType"
                            value={sortingType}
                            onChange={(e) => setSelectedSortingType(e.value)}
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
                <SelectButton
                    value={productTypeToFilter}
                    options={productTypesToFilter}
                    onChange={(e) => {
                        setProductTypeToFilter(
                            e.target.value === null ? '' : e.target.value
                        );
                    }}
                />
            </div>
            <div>
                <div className="field-checkbox">
                    <Checkbox
                        inputId="all"
                        name="all"
                        value="all"
                        onChange={onSelectAllBrandsToFilter}
                        checked={brandsToFilter.indexOf('all') !== -1}
                    />
                    <span htmlFor="all">
                        All ({allProductNumbersForBrands})
                    </span>
                </div>
                {brands.map((brand) => (
                    <div key={brand.id} className="field-checkbox">
                        <Checkbox
                            inputId={brand.id}
                            name={brand.slug}
                            value={brand.slug}
                            onChange={onSelectBrandToFilter}
                            checked={
                                !brandsToFilter.includes('all') &&
                                brandsToFilter.indexOf(brand.slug) !== -1
                            }
                        />
                        <span htmlFor={brand.id}>
                            {brand.name} ({brand.noOfProduct})
                        </span>
                    </div>
                ))}
            </div>
            <div>
                {Object.keys(tagsToFilter).map((tag) => (
                    <div key={tag} className="field-checkbox">
                        <Checkbox
                            inputId={tag}
                            name={tag}
                            value={tag}
                            onChange={tagSelectHandler}
                            checked={
                                tag === 'All'
                                    ? tagsToFilter.All.checked
                                    : !(
                                          tagsToFilter.All &&
                                          tagsToFilter.All.checked
                                      ) && tagsToFilter[tag].checked
                            }
                        />
                        <span htmlFor={tag.id}>
                            {tag} (
                            {tag === 'All'
                                ? allProductNumbersForTags
                                : tagsToFilter[tag].number}
                            )
                        </span>
                    </div>
                ))}
            </div>

            <DataView
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
    );
};

export default Main;
