import { writable } from "svelte/store";

const { subscribe, update } = writable([]);

function createTodo(todo) {
  update((todoList) => [...todoList, todo]);
}

function deleteTodo(todo) {
  update((todoList) => todoList.filter((item) => todo !== item));
}

function completeTodo(todo) {
  update((todoList) =>
    todoList.map((item) => {
      if (todo === item)
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      return item;
    })
  );
}

function completeAllTodos() {
  update(() =>
    todoList.map((todo) => ({
      ...todo,
      isCompleted: !allTodosAreCompleted,
    }))
  );
}

function clearCompleted() {
  update((todoList) =>
    todoList.filter(({ isCompleted }) => isCompleted === false)
  );
}

function swapTodos(index1, index2) {
  update((todoList) => {
    return todoList.map((todo, index) => {
      if (index === index1) return { ...todoList[index2] };
      else if (index === index2) return { ...todoList[index1] };
      else return todo;
    });
  });
}

export default {
  subscribe,
  createTodo,
  deleteTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
  swapTodos,
};
