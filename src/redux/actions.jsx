export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SEARCH_TODOS = 'SEARCH_TODOS';
export const TOGGLE_SORT = 'TOGGLE_SORT';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';

export const addTodo = (newTodo) => ({
  type: ADD_TODO,
  payload: newTodo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (id, newTitle) => ({
  type: UPDATE_TODO,
  payload: { id, newTitle },
});

export const searchTodos = (searchQuery) => ({
  type: SEARCH_TODOS,
  payload: searchQuery,
});

export const toggleSort = () => ({
  type: TOGGLE_SORT,
});

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3002/todos');
    const data = await response.json();
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    console.log('Ошибка при получении данных', error);
  }
};