<script>
  import Header from "./components/Header.svelte";
  import TodoList from "./components/TodoList.svelte";

  let todoList = [];
  let allTodosAreCompleted = false;

  function createTodo(todo) {
    todoList = [...todoList, todo];
    if (allTodosAreCompleted) allTodosAreCompleted = false;
  }

  function deleteTodo(todo) {
    todoList = todoList.filter((item) => todo !== item);
  }

  function completeTodo(todo) {
    const index = todoList.indexOf(todo);
    todoList[index] = {
      ...todoList[index],
      isCompleted: !todoList[index].isCompleted,
    };
    if (allTodosAreCompleted) allTodosAreCompleted = false;
  }

  function completeAllTodos() {
    todoList = todoList.map((todo) => ({
      ...todo,
      isCompleted: !allTodosAreCompleted,
    }));
    allTodosAreCompleted = !allTodosAreCompleted;
  }

  function clearCompleted() {
    todoList = todoList.filter(({ isCompleted }) => isCompleted === false);
    if (allTodosAreCompleted) allTodosAreCompleted = false;
  }
</script>

<div class="min-h-screen bg-light-100 antialiased font-sans text-xs">
  <Header {createTodo} {allTodosAreCompleted} {completeAllTodos} />
  <div class="px-6 -mt-7">
    <TodoList {todoList} {deleteTodo} {completeTodo} {clearCompleted} />
  </div>
  {#if todoList.length}
    <p class="mt-10 text-sm text-center text-light-400">
      Drag and drop to reorder list
    </p>
  {/if}
</div>
