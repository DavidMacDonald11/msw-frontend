<script>
  import {user} from "../stores"

  const logout = () => {
    user.update(() => ({
      name: null,
      loggedIn: false,
      token: null
    }))
  }
</script>

<div class="flex-container flex-bar">
  <img src="/images/favicon/favicon.ico" alt="Minecraft Logo" />
  <div class="flex-item">
    <h1>David's Minecraft Server Manager</h1>
  </div>
  {#if $user.loggedIn}
    <div class="flex-item account-info">
      <h5>Account:</h5>
      <h6 class="name">{$user.name}</h6>
      <button on:click={logout}>Logout</button>
    </div>
  {/if}
</div>

<style>
  .account-info > * {
    margin: 2px 0;
  }

  .account-info .name {
    color: #4a4a4a;
  }

  .account-info button {
    font-size: 0.7em;
  }
</style>
