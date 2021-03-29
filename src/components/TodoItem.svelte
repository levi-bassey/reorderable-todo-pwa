<script>
  import Checkbox from "../components/Checkbox.svelte";
  import todoList from "../todoStore.js";

  export let todoItem;

  $: ({ todo, isCompleted } = todoItem);

  function handleDragstart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function handleDrop(event) {
    const idOfDragged = event.dataTransfer.getData("text/plain");
    const index1 = $todoList.findIndex((todo) => todo.id === idOfDragged);
    const index2 = $todoList.findIndex((todo) => todo.id === event.target.id);
    todoList.swapTodos(index1, index2);
  }
</script>

<li
  id={todoItem.id}
  draggable="true"
  on:dragstart={handleDragstart}
  on:dragover|preventDefault
  on:drop={handleDrop}
  class="group flex items-center px-5 sm:px-6 py-4 sm:py-6 border-b cursor-pointer border-light-200 dark:border-dark-700"
>
  <Checkbox
    on:input={todoList.completeTodo(todoItem)}
    checked={isCompleted}
    id="isCompleted"
    name="isCompleted"
  />
  <p
    class="ml-3 sm:ml-6 sm:text-lg {isCompleted
      ? 'text-light-300 dark:text-dark-600 line-through'
      : 'text-light-500 dark:text-dark-300'}"
  >
    {todo}
  </p>
  <button
    on:click={() => todoList.deleteTodo(todoItem)}
    class="invisible ml-auto group-hover:visible"
  >
    <svg
      class="w-3 h-3 sm:h-4 sm:w-4 fill-current text-light-500"
      viewBox="0 0 12 12"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
      />
    </svg>
  </button>
</li>
