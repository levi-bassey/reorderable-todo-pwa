<script>
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
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

<div class="max-w-xl mx-auto shadow-xl rounded-t-md overflow-hidden">
  <ul class="bg-white dark:bg-dark-200">
    {#each filteredList as todoItem (todoItem.id)}
      <li animate:flip={{ duration: 250, easing: quintOut }}>
        <TodoItem {todoItem} />
      </li>
    {/each}
  </ul>
</div>

{#if $todoList.length}
  <div
    transition:fade={{ duration: 500, delay: 500 }}
    class="flex justify-between max-w-xl mx-auto px-5 sm:px-6 py-4 rounded-b-md shadow-xl bg-white dark:bg-dark-200 sm:text-sm text-light-400 dark:text-dark-500"
  >
    <p>
      {uncompletedTodosCount}
      {uncompletedTodosCount === 1 ? "item" : "items"} left
    </p>
    <div>
      <div
        class="hidden sm:flex max-w-xl mx-auto items-center justify-center space-x-5 font-bold"
      >
        {#each filterationCriteria as criteria}
          <button
            on:click={handleClick}
            name={criteria}
            class:text-primary={filterBy === criteria}
            class="font-bold capitalize hover:text-light-500 dark:hover:text-light-200"
            >{criteria}</button
          >
        {/each}
      </div>
    </div>
    <button
      class="hover:text-light-500 dark:hover:text-light-200"
      on:click={todoList.clearCompleted}>Clear Completed</button
    >
  </div>
{/if}

{#if $todoList.length}
  <div
    transition:fade={{ duration: 500, delay: 500 }}
    class="flex sm:hidden max-w-xl mx-auto items-center justify-center mt-4 py-4 space-x-5 rounded-md bg-white dark:bg-dark-200 shadow-xl font-bold text-sm text-light-400 dark:text-dark-500"
  >
    {#each filterationCriteria as criteria}
      <button
        on:click={handleClick}
        name={criteria}
        class:text-primary={filterBy === criteria}
        class="font-bold capitalize hover:text-light-500 dark:hover:text-light-200"
        >{criteria}</button
      >
    {/each}
  </div>
{/if}
