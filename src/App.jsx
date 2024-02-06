import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  searchTodos,
  toggleSort,
} from './redux/thunks';


function App() {
  const todos = useSelector((state) => state.todos);
  const sortMode = useSelector((state) => state.sortMode);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTodoHandler = () => {
    dispatch(addTodo(newTodo));
    setNewTodo('');
  };

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const updateTodoHandler = (id, newTitle) => {
    dispatch(updateTodo(id, newTitle));
  };

  const searchTodosHandler = () => {
    dispatch(searchTodos(searchQuery));
  };

  const toggleSortHandler = () => {
    dispatch(toggleSort());
  };

  const sortedTodos = sortMode
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : [...todos];

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Новая задача"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button onClick={addTodoHandler}>Добавить задачу</button>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); searchTodosHandler(); }}>
        <input
          type="text"
          placeholder="Поиск задачи"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Поиск</button>
      </form>

      <div>
        <label>
          <input type="checkbox" onChange={toggleSortHandler} />
          Сортировать по алфавиту
        </label>
      </div>

      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodoHandler(todo.id)}>Удалить</button>
            <button
              onClick={() => {
                const newTitle = prompt('Введите новое название задачи:', todo.title);
                if (newTitle !== null) {
                  updateTodoHandler(todo.id, newTitle);
                }
              }}
            >
              Изменить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;