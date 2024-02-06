export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const SEARCH_TODOS_SUCCESS = "SEARCH_TODOS_SUCCESS";
export const TOGGLE_SORT = "TOGGLE_SORT";

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

export const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO_SUCCESS,
  payload: id,
});

export const updateTodoSuccess = (id, title) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: { id, title },
});

export const searchTodosSuccess = (filteredTodos) => ({
  type: SEARCH_TODOS_SUCCESS,
  payload: filteredTodos,
});

export const toggleSort = () => ({
  type: TOGGLE_SORT,
});
