import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Learn Testing', completed: false },
        { id: 3, text: 'Build a Todo App', completed: false },
    ]);
    
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    function addTask(text) {
        if (!text.trim()) {
            setError('Todo cannot be empty');
            return;
        }

        if (text.length < 3) {
            setError('Todo must be at least 3 characters long');
            return;
        }

        setError('');

        if (tasks.some(task => task.text === text.trim())) {
            setError('Todo is a duplicate');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleTask(id) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    return (
        <div data-testid="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                />
            ))}
            <input
                placeholder="Add a new todo"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => addTask(text)}>Add Todo</button>
            {error && <p data-testid="error-message">{error}</p>}
        </div>
    );
}

export default TodoList;
