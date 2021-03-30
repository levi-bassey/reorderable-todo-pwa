import { writable } from "svelte/store";
import { openDB } from "idb";
import { nanoid } from "nanoid";

let db;

const { subscribe, update } = writable([], (set) => {
  (async () => {
    db = await openDB("todoDB", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        db.createObjectStore("store");
      },
    });
    let todos = await db
      .transaction("store", "readwrite")
      .objectStore("store")
      .get("todos");
    set([...(todos ? todos : [])]);
  })();
  return () => {
    db.close();
  };
});

function createTodo(todoInput) {
  update((todoList) => {
    const newList = [
      ...todoList,
      {
        id: nanoid(),
        todo: todoInput,
        isCompleted: false,
      },
    ];
    db.transaction("store", "readwrite")
      .objectStore("store")
      .put(newList, "todos");
    return newList;
  });
}

function deleteTodo(todoId) {
  update((todoList) => {
    const newList = todoList.filter((todo) => todoId !== todo.id);
    db.transaction("store", "readwrite")
      .objectStore("store")
      .put(newList, "todos");
    return newList;
  });
}

function completeTodo(todoId) {
  let completedTodo;
  update((todoList) => {
    const newList = todoList.map((todo) => {
      if (todoId === todo.id) {
        completedTodo = {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
        return completedTodo;
      }
      return todo;
    });
    db.transaction("store", "readwrite")
      .objectStore("store")
      .put(newList, "todos");
    return newList;
  });
}

function clearCompleted() {
  update((todoList) => {
    const newList = todoList.filter((todo) => {
      return todo.isCompleted !== true;
    });
    db.transaction("store", "readwrite")
      .objectStore("store")
      .put(newList, "todos");
    return newList;
  });
}

function reorderTodos(idOfTodo1, idOfTodo2) {
  update((todoList) => {
    const todo1 = todoList.find((todo) => idOfTodo1 === todo.id);
    const todo2 = todoList.find((todo) => idOfTodo2 === todo.id);
    const newList = todoList.map((todo) => {
      if (idOfTodo1 === todo.id) return { ...todo2 };
      else if (idOfTodo2 === todo.id) return { ...todo1 };
      else return todo;
    });
    db.transaction("store", "readwrite")
      .objectStore("store")
      .put(newList, "todos");
    return newList;
  });
}

export default {
  subscribe,
  createTodo,
  deleteTodo,
  completeTodo,
  clearCompleted,
  reorderTodos,
};
