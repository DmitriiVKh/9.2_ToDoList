import { combineReducers } from 'redux';
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SEARCH_TODOS,
  TOGGLE_SORT,
  FETCH_TODOS_SUCCESS,
} from './actions';

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.newTitle } : todo
      );

    case FETCH_TODOS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

const searchReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH_TODOS:
      return action.payload;

    default:
      return state;
  }
};

const sortReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return !state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos: todosReducer,
  searchQuery: searchReducer,
  sortMode: sortReducer,
});

export default rootReducer;