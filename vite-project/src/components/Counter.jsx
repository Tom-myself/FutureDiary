import React, { useEffect, useState } from 'react';

const Counter = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState(''); // 新しいタスクの入力値

  // Function to handle task completion
  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to handle task addition
  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          text: newTaskText,
          completed: false,
        },
      ]);
      setNewTaskText(''); // 入力フィールドをリセット
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  
  const level = Math.floor(completedTasks / 5); // 5タスクごとにレベルアップ
  const nextLevelTasks = (level + 1) * 5; // 次のレベルに必要なタスク数
  
  const progress = (completedTasks / nextLevelTasks) * 100;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>

      {/* 新しいタスクを追加する入力フォーム */}
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="New task"
        style={{ marginRight: '10px' }}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            {task.text}
          </li>
        ))}
      </ul>

      {/* Progress Bar */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
          <div
            style={{
              height: '20px',
              width: `${progress}%`,
              backgroundColor: progress === 100 ? 'green' : 'orange',
              borderRadius: '5px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <p>{Math.round(progress)}% Complete</p>
      </div>

      {/* レベル表示 */}
      <div style={{ marginTop: '20px' }}>
        <h2>Level: {level}</h2>
        <p>Tasks completed for next level: {completedTasks} / {nextLevelTasks}</p>
      </div>
    </div>
  );
};

export default Counter;
