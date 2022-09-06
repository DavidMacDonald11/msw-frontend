<script>
  import {onMount} from "svelte"
  import {user} from "./stores"
  import Titlebar from "./components/Titlebar.svelte"
  import Home from "./components/Home.svelte"
  import LoginForm from "./components/forms/LoginForm.svelte"

  let focus = null

  onMount(() => {
    if (focus !== null) focus.focus()
  })
</script>

<main>
  <Titlebar />
  <div class="flex-container">
    {#if !$user.loggedIn}
      <LoginForm bind:focus />
    {:else}
      <Home />
    {/if}
  </div>
</main>
