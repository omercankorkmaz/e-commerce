import { render, fireEvent, screen } from '@testing-library/react';
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

test('basket without any product', () => {
    const button = screen.getByTestId('basket-button');
    fireEvent.click(button);
    const basketWrapper = screen.getByTestId('basket-wrapper');
    expect(basketWrapper).toHaveTextContent(
        "You haven't added anything to your cart yet"
    );
});
