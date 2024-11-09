import { useState, useEffect } from "react";
import axios from 'axios';
import Check from "./item/Check";
import { BsTrash } from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3002/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error loading todos:', error));
  }, []);

  const addTodo = async (title) => {
    try {
      const response = await axios.post('http://localhost:3002/api/todos', {
        title,
        isCompleted: false,
      });

      const newTodo = response.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTitle('');
    } catch (err) {
      console.log('Error creating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13 && title.trim()) {
      addTodo(title);
    }
  };

  const updateTodoStatus = async (_id, isCompleted) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/todos/${_id}`,
        {
          isCompleted: !isCompleted,
        }
      );
      const updatedTodo = response.data;
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 text-pink-400">Todo List</h1>
      
      {todos.map((todo, index) => (
        <div className="flex items-center justify-between mb-4 rounded-2xl bg-gray-800 p-5 w-full" key={index}>
          <button className="flex items-center">
            <Check todo={todo} updateTodoStatus={updateTodoStatus} />
            <span>{todo.title}</span>
          </button>
          <button onClick={() => deleteTodo(todo._id)}>
            <BsTrash size={22} className='text-gray-600 hover:text-red-700 transition-colors ease-in-out duration-300' />
          </button>
        </div>
      ))}
      
      <div className="flex items-center justify-between mb-4 rounded-2xl bg-gray-800 px-5 py-2 w-full h-full mt-20">
        <input
          className="bg-transparent w-full border-none outline-none placeholder-pink-400"
          type='text'
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder='Add task...'
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Home;

