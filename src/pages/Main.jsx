import React, { useEffect, useMemo, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
import { RadioButton } from 'primereact/radiobutton';
import ProductCard from '../components/ProductCard';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productTypeToShow, setProductTypeToShow] = useState('');

    const sortingTypes = [
        { key: 'plh', name: 'Price low to high', field: 'price', order: 1 },
        { key: 'phl', name: 'Price high to low', field: 'price', order: -1 },
        { key: 'dno', name: 'New to old', field: 'added', order: -1 },
        { key: 'don', name: 'Old to new', field: 'added', order: 1 },
    ];

    const [selectedSortingType, setSelectedSortingType] = useState(
        sortingTypes[0]
    );

    const productTypesToShow = useMemo(() => {
        const arr = products.reduce((prevArr, currentEl) => {
            if (!prevArr.includes(currentEl.itemType))
                prevArr.push(currentEl.itemType);
            return prevArr;
        }, []);
        setProductTypeToShow(arr[0]);
        return arr;
    }, [products]);

    const filteredItems = useMemo(
        () =>
            products.filter(
                (product) => product.itemType === productTypeToShow
            ),
        [products, productTypeToShow]
    );

    const rows = 16;

    const productTemplate = (product) => <ProductCard product={product} />;

    useEffect(() => {
        (async () => {
            const productsResult = await (
                await fetch('http://127.0.0.1:3001/items')
            ).json();
            setProducts(productsResult.items);

            const companiesResult = await (
                await fetch('http://127.0.0.1:3001/companies')
            ).json();
            setBrands(companiesResult.companies);

            setIsLoading(false);
        })();
    }, []);

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
                value={productTypeToShow}
                options={productTypesToShow}
                onChange={(e) => {
                    setProductTypeToShow(e.target.value);
                }}
            />
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
            {productTypesToShow.length}
            {brands.length}
        </div>
    );
};

export default Main;
