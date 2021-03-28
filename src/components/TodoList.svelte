<script>
  import TodoItem from "./TodoItem.svelte";
  import todoList from "../todoStore.js";

  const filterationCriteria = ["all", "active", "completed"];

  let filteredList;
  let filterBy = "all";

  $: uncompletedTodosCount = $todoList.filter(
    (todo) => todo.isCompleted === false
  ).length;

  $: if (filterBy === "active")
    filteredList = $todoList.filter((todo) => todo.isCompleted === false);
  else if (filterBy === "completed")
    filteredList = $todoList.filter((todo) => todo.isCompleted === true);
  else filteredList = [...$todoList];

  function handleClick(event) {
    filterBy = event.target.name;
  }
</script>

<div class="bg-white shadow-xl rounded-md">
  <ul>
    {#each filteredList as todoItem (todoItem.id)}
      <TodoItem {todoItem} />
    {/each}
  </ul>
  {#if $todoList.length}
    <div class="flex justify-between px-5 py-4 text-light-400">
      <p>
        {uncompletedTodosCount}
        {uncompletedTodosCount === 1 ? "item" : "items"} left
      </p>
      <button on:click={todoList.clearCompleted}>Clear Completed</button>
    </div>
  {/if}
</div>

{#if $todoList.length}
  <div
    class="flex items-center justify-center mt-4 py-4 space-x-5 bg-white shadow-xl font-bold text-sm text-light-400"
  >
    {#each filterationCriteria as criteria}
      <button
        on:click={handleClick}
        name={criteria}
        class:text-primary={filterBy === criteria}
        class="font-bold capitalize">{criteria}</button
      >
    {/each}
  </div>
{/if}
