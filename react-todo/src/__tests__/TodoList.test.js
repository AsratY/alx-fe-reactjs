import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import is present
import TodoList from '../components/TodoList'; // Adjust the path if necessary

describe('TodoList Component', () => {
  // Test Initial Render
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test Adding Todos
  test('can add a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Task');
    const addButton = screen.getByText('Add'); // Adjusted to match the actual button text

    // Simulate user input
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Verify the new todo appears in the list
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  // Test Toggling Todos
  test('can toggle a todo between completed and not completed', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');

    // Check initial state
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');

    // Toggle todo
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');

    // Toggle todo back
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  // Test Deleting Todos
  test('can delete a todo', () => {
    render(<TodoList />);
    
    // Get the todo item to delete
    const todoItemText = 'Build a Todo App';
    const todoItem = screen.getByText(todoItemText);

    // Ensure the todo item is present
    expect(todoItem).toBeInTheDocument();

    // Find the delete button associated with the todo item
    const deleteButton = screen.getAllByText('x').find(button => button.previousSibling.textContent === todoItemText);

    // Ensure the delete button exists and click it
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    // Verify the todo item is removed
    expect(screen.queryByText(todoItemText)).not.toBeInTheDocument();
  });
});
