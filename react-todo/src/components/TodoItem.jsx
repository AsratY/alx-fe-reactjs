import React from 'react';

function TodoItem({ task, deleteTask, toggleTask }) {
    return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                aria-label={task.text}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </p>
            <button
                data-testid={`delete-todo-${task.text}`}
                onClick={() => deleteTask(task.id)}
            >
                X
            </button>
        </div>
    );
}

export default TodoItem;
