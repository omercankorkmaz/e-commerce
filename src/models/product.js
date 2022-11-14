export default class Product {
    tags;

    price;

    name;

    description;

    slug;

    added;

    manufacturer;

    itemType;

    constructor(product) {
        Object.assign(this, product);
    }
}
