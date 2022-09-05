<script>
  import {onMount} from "svelte"
  import Titlebar from "./components/Titlebar.svelte"
  import Home from "./components/Home.svelte"
  import LoginForm from "./components/forms/LoginForm.svelte"

  let focus = null

  let user = {loggedIn: false}

  onMount(() => {
    if (focus !== null) focus.focus()
  })
</script>

<main>
  <Titlebar bind:user />
  <div class="flex-container">
    {#if !user.loggedIn}
      <LoginForm bind:focus bind:user />
    {:else}
      <Home />
    {/if}
  </div>
</main>
