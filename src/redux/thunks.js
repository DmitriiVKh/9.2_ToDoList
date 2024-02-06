import {
  fetchTodosSuccess,
  addTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess,
  searchTodosSuccess,
} from "./actions";

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3002/todos");
    const data = await response.json();
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    console.log("Ошибка при получении данных", error);
  }
};

export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3002/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    });

    const data = await response.json();
    dispatch(addTodoSuccess(data));
  } catch (error) {
    console.log("Ошибка при добавлении дела", error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3002/todos/${id}`, {
      method: "DELETE",
    });
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    console.log("Ошибка при удалении дела", error);
  }
};

export const updateTodo = (id, newTitle) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    dispatch(updateTodoSuccess(id, newTitle));
  } catch (error) {
    console.log("Ошибка при обновлении дел", error);
  }
};

export const searchTodos = (searchQuery) => (dispatch, getState) => {
  const { todos } = getState();
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  dispatch(searchTodosSuccess(filteredTodos));
};

export const toggleSort = () => (dispatch) => {
  dispatch({ type: "TOGGLE_SORT" });
};
