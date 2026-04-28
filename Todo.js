
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h2>Мой список дел (React)</h2>
        
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите новую задачу..."
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">
            Добавить
          </button>
        </div>

        <div className="todo-list">
          {tasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
          {tasks.length === 0 && (
            <p className="empty-message">Список дел пуст</p>
          )}
        </div>

        <div className="stats">
          Всего задач: {tasks.length} | 
          Выполнено: {tasks.filter(task => task.completed).length}
        </div>
      </div>
    </div>
  );
}

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="checkbox"
      />
      <span className="todo-text">{task.text}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
      >
        Удалить
      </button>
    </div>
  );
}

export default App;
