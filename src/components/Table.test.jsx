import { render, screen } from '@testing-library/react';
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

test('table without any product', () => {
    const table = screen.getByTestId('product-table');
    expect(table).toHaveTextContent('No results found');
});
