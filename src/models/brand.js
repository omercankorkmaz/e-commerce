export default class Brand {
    slug;

    name;

    address;

    city;

    state;

    zip;

    account;

    contact;

    constructor(brand) {
        Object.assign(this, brand);
    }
}
