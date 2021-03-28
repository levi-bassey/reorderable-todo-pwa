<script>
  export let checked = false;
  export let name;
  export let id;
</script>

<input
  style={checked
    ? `background-image: url(images/icon-check.svg), linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)`
    : ""}
  bind:checked
  on:input
  type="checkbox"
  {name}
  {id}
  class="appearance-none w-5 h-5 rounded-full border-light-200 dark:border-dark-700 border checked:border-0 bg-no-repeat bg-center"
/>
