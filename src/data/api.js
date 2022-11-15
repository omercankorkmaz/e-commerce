const items = require('./items.json');
const companies = require('./companies.json');

// To execute both in different routes with same port
module.exports = () => ({
    items,
    companies,
});
