<script>
  import Header from "./components/Header.svelte";
  import TodoList from "./components/TodoList.svelte";
  import todoList from "./todoStore.js";
</script>

<div class="min-h-screen bg-light-100 antialiased font-sans text-xs">
  <Header />
  <div class="px-6 -mt-7">
    <TodoList />
  </div>
  {#if $todoList.length}
    <p class="mt-10 text-sm text-center text-light-400">
      Drag and drop to reorder list
    </p>
  {/if}
</div>
