<script lang='ts'>
  export let name;
  export let buttonText = "Button";
  function handleClick() {
    buttonText += " Clicked";
  }
</script>

<!-- your code here -->
<h1 class="text-primary text-4xl font-bold">Hello {name}!</h1>

<button on:click={handleClick}>{buttonText}</button>