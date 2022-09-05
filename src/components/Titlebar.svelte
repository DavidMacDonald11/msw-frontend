<script>
  export let user

  const logout = () => {
    user.loggedIn = false
    user.token = null

    localStorage.setItem("user", JSON.stringify(user))
  }
</script>

<div class="flex-container flex-bar">
  <img src="/images/favicon/favicon.ico" alt="Minecraft Logo" />
  <div class="flex-item">
    <h1>David's Minecraft Server Manager</h1>
  </div>
  {#if user.loggedIn}
    <div class="flex-item">
      <h5>Account:</h5>
      <h6>{user.name}</h6>
      <button on:click|preventDefault={logout}>Logout</button>
    </div>
  {/if}
</div>

<style>
</style>
