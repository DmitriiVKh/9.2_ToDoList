import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  searchTodos,
  toggleSort,
  fetchTodos,
} from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const searchQuery = useSelector((state) => state.searchQuery);
  const sortMode = useSelector((state) => state.sortMode);

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const sortedTodos = sortMode
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : [...todos];

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      await dispatch(addTodo({ title: newTodo }));
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id) => {
    await dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = async (id, newTitle) => {
    await dispatch(updateTodo(id, newTitle));
  };

  const handleSearchTodos = (event) => {
    event.preventDefault();
    dispatch(searchTodos(searchQuery));
  };

  return (
    <>
      <div className="todo-list">
        <h1>Todo List</h1>
        <div>
          <input
            type='text'
            placeholder='Новая задача'
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button onClick={handleAddTodo}>Добавить задачу</button>
        </div>

        <form onSubmit={handleSearchTodos}>
          <input
            type='text'
            placeholder='Поиск задачи'
            value={searchQuery}
            onChange={(event) => dispatch(searchTodos(event.target.value))}
          />
          <button type="submit">Поиск</button>
        </form>

        <div>
          <label>
            <input
              type='checkbox'
              onChange={() => dispatch(toggleSort())}
            />
            Сортировать по алфавиту
          </label>
        </div>
        <ul>
          {sortedTodos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
              <button
                onClick={() => {
                  const newTitle = prompt('Введите новое название задачи:', todo.title);
                  if (newTitle !== null) {
                    handleUpdateTodo(todo.id, newTitle);
                  }
                }}
              >
                Изменить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;