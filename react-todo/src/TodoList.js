import React, { useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Learn Jest', completed: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoText) return;
    setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
            <button onClick={(e) => { e.stopPropagation(); handleDeleteTodo(todo.id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
