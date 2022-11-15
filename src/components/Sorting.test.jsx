import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';

beforeEach(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});

test('price sorting', async () => {
    await waitFor(() => {
        const firstProductCards = screen.getAllByTestId('product-card');
        expect(firstProductCards).toHaveLength(16);
        const minProductPrice = firstProductCards[0].children[1];
        const sortingItems = screen.getAllByTestId('sorting-item');
        fireEvent.click(sortingItems[1]);
        const secondProductCards = screen.getAllByTestId('product-card');
        expect(secondProductCards).toHaveLength(16);
        const maxProductPrice = secondProductCards[0].children[1];
        const min = minProductPrice.innerHTML;
        const max = maxProductPrice.innerHTML;
        expect(Number(max.split(' ')[1])).toBeGreaterThan(
            Number(min.split(' ')[1])
        );
    });
});
