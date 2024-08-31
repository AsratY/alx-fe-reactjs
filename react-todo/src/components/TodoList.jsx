import React, { useState } from 'react';

const TodoList = () => {
  const [itemData, setItemData] = useState({ text: '' });
  const [items, setItems] = useState([
    { text: 'Learn React', completed: false },
    { text: 'Build a Todo App', completed: false },
    { text: 'Write Tests', completed: false }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleSubmit = () => {
    if (itemData.text.trim()) {
      setItems([...items, { text: itemData.text, completed: false }]);
      setItemData({ text: '' });
    }
  };

  const handleToggle = (indexToToggle) => {
    setItems(
      items.map((item, index) =>
        index === indexToToggle
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const handleDelete = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div>
      <input
        type="text"
        name="text"
        id="text"
        value={itemData.text}
        onChange={handleChange}
        placeholder="Task"
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleToggle(index)}
            style={{
              textDecoration: item.completed ? 'line-through' : 'none',
              color: item.completed ? 'gray' : 'black',
              cursor: 'pointer',
              backgroundColor: item.completed ? '#f0f0f0' : 'transparent',
            }}
          >
            {item.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
              style={{ marginLeft: '10px' }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
