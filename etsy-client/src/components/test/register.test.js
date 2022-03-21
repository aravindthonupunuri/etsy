import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootreducer from '../../reducers/index';
import SignUp from '../../components/SignUp/SignUp';

test('register screen', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <SignUp />
  </Provider>);
    const linkElement = screen.getByText(/Please register here/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('testing register email input type', () => {
    const store = createStore(rootreducer)
    render(<Provider store={store}>
      <SignUp />
  </Provider>);
    const inputBox = screen.getByTestId('emailId');
    fireEvent.change(inputBox, {target: {value: 'aravind@gmail.com'}});
    expect(inputBox.value).toBe('aravind@gmail.com');
  });