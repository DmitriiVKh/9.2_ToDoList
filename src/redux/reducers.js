import { combineReducers } from "redux";
import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  SEARCH_TODOS_SUCCESS,
  TOGGLE_SORT,
} from "./actions";

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return action.payload;

    case ADD_TODO_SUCCESS:
      return [...state, action.payload];

    case DELETE_TODO_SUCCESS:
      return state.filter((todo) => todo.id !== action.payload);

    case UPDATE_TODO_SUCCESS:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );

    case SEARCH_TODOS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

const sortModeReducer = (state = false, action) => {
  if (action.type === TOGGLE_SORT) {
    return !state;
  }
  return state;
};

export { todosReducer, sortModeReducer };

const rootReducer = combineReducers({
  todos: todosReducer,
  sortMode: sortModeReducer,
});

export default rootReducer;
