import React, { useEffect, useMemo, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import ProductCard from '../components/ProductCard';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandsToFilter, setBrandsToFilter] = useState([]);
    const [productTypeToFilter, setProductTypeToFilter] = useState('');

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

    const filteredItems = useMemo(
        () =>
            products.filter(
                (product) =>
                    (productTypeToFilter
                        ? product.itemType === productTypeToFilter
                        : true) &&
                    (brandsToFilter[0] === 'all' ||
                        brandsToFilter.includes(product.manufacturer))
            ),
        [products, productTypeToFilter, brandsToFilter]
    );

    const rows = 16;

    const productTemplate = (product) => <ProductCard product={product} />;

    const allProductNumbers = useMemo(
        () =>
            products.filter((product) =>
                productTypeToFilter
                    ? product.itemType === productTypeToFilter
                    : true
            ).length,
        [products, productTypeToFilter]
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

    const onSelectBrandsToFilterChange = (e) => {
        const selectedBrands = [...brandsToFilter];

        if (selectedBrands.indexOf('all') !== -1) {
            selectedBrands.splice(selectedBrands.indexOf('all'), 1);
        }
        if (e.checked) selectedBrands.push(e.value);
        else selectedBrands.splice(selectedBrands.indexOf(e.value), 1);

        setBrandsToFilter(selectedBrands);
    };

    const onSelectAllBrandsToFilter = (e) => {
        if (e.checked) {
            setBrandsToFilter(['all']);
        } else {
            setBrandsToFilter([]);
        }
    };

    return (
        <div className="main">
            {sortingTypes.map((sortingType) => (
                <div key={sortingType.key} className="field-radiobutton">
                    <RadioButton
                        inputId={sortingType.key}
                        name="sortingType"
                        value={sortingType}
                        onChange={(e) => setSelectedSortingType(e.value)}
                        checked={selectedSortingType.key === sortingType.key}
                        // disabled={category.key === 'R'}
                    />
                    <label htmlFor={sortingType.key}>{sortingType.name}</label>
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

            <div className="field-checkbox">
                <Checkbox
                    inputId="all"
                    name="all"
                    value="all"
                    onChange={onSelectAllBrandsToFilter}
                    checked={brandsToFilter.indexOf('all') !== -1}
                />
                <span htmlFor="all">All ({allProductNumbers})</span>
            </div>
            {brands.map((brand) => (
                <div className="field-checkbox">
                    <Checkbox
                        inputId={brand.id}
                        name={brand.slug}
                        value={brand.slug}
                        onChange={onSelectBrandsToFilterChange}
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

            <DataView
                value={filteredItems}
                layout="grid"
                itemTemplate={productTemplate}
                rows={rows}
                paginator
                loading={isLoading}
                sortOrder={selectedSortingType.order}
                sortField={selectedSortingType.field}
            />
            {productTypesToFilter.length}
        </div>
    );
};

export default Main;
