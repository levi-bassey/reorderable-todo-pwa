<script>
  import Header from "./components/Header.svelte";
  import TodoList from "./components/TodoList.svelte";
  import todoList from "./todoStore.js";

  let prefersDarkMode =
    localStorage.getItem("prefersDarkMode") === "true" ? true : false;

  $: localStorage.setItem("prefersDarkMode", prefersDarkMode);

  function toggleDarkMode() {
    prefersDarkMode = !prefersDarkMode;
  }
</script>

<div class:dark={prefersDarkMode}>
  <div
    class="min-h-screen bg-light-100 dark:bg-dark-100 antialiased font-sans text-xs"
  >
    <Header {prefersDarkMode} {toggleDarkMode} />
    <div class="relative px-6 -mt-7 sm:-mt-24">
      <TodoList />
    </div>
    {#if $todoList.length}
      <p class="mt-10 text-sm text-center text-light-400 dark:text-dark-500">
        Drag and drop to reorder list
      </p>
    {/if}
  </div>
</div>
