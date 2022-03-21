import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootreducer from '../../reducers/index';
import Login from '../../components/Login/Login';

test('login screen', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <Login />
  </Provider>);
    const linkElement = screen.getByText(/Please login/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('testing email input type', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <Login />
  </Provider>);
    const inputBox = screen.getByTestId('emailId');
    fireEvent.change(inputBox, {target: {value: 'aravind@gmail.com'}});
    expect(inputBox.value).toBe('aravind@gmail.com');
  });