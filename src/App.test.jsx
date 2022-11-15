import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

beforeEach(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});

test('adding a product from table and view it in the basket', async () => {
    await waitFor(() => {
        const productCards = screen.getAllByTestId('product-card');
        expect(productCards).toHaveLength(16);
        const random = Math.floor(Math.random() * 16);
        const productName = productCards[random].children[2];
        const productAddButton = productCards[random].children[3].children[0];
        fireEvent.click(productAddButton);
        const button = screen.getByTestId('basket-button');
        fireEvent.click(button);
        const basketProductName = screen.getByTestId('basket-product-name');
        expect(basketProductName.innerHTML).toEqual(productName.innerHTML);
    });
});
