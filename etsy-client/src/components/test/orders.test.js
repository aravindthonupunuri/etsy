import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootreducer from '../../reducers/index';
import Orders from '../../components/Orders/Orders';

test('orders screen', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <Orders />
  </Provider>);
    const linkElement = screen.getByText(/My purchases/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('orders screen with out any orders placed', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <Orders />
  </Provider>);
    const linkElement = screen.getByText(/You do not have any orders made in the past/i);
    expect(linkElement).toBeInTheDocument();
  });