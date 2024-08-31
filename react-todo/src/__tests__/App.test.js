import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  test('renders the TodoList component', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument(); 
  });
});
