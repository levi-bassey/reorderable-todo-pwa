<script>
  import Checkbox from "../components/Checkbox.svelte";

  export let deleteTodo;
  export let completeTodo;
  export let todoItem;

  $: ({ todo, isCompleted } = todoItem);

  function handleClick() {
    deleteTodo(todoItem);
  }

  function handleInput() {
    completeTodo(todoItem);
  }
</script>

<li class="flex items-center px-5 py-4 border-b border-light-200">
  <Checkbox
    on:input={handleInput}
    checked={isCompleted}
    id="isCompleted"
    name="isCompleted"
  />
  <p
    class="ml-3 {isCompleted
      ? 'text-light-300 line-through'
      : 'text-light-500'}"
  >
    {todo}
  </p>
  <button on:click={handleClick} class="ml-auto">
    <svg class="w-3 h-3 fill-current text-light-500" viewBox="0 0 12 12">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
      />
    </svg>
  </button>
</li>
