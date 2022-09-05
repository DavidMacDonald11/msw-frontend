<script>
  import axios from "axios"
  import Error from "../Error.svelte"
  import AuthForm from "./AuthForm.svelte"

  export let focus
  export let user

  let failed = false

  const submit = async form => {
    try {
      const res = await axios.post("/api/auth/login", form)

      user = {
        loggedIn: true,
        name: form.username,
        token: res.data.token
      }

      localStorage.setItem("user", JSON.stringify(user))

      failed = false
    } catch (error) {
      failed = true
    }
  }
</script>

{#if failed}
  <Error message="Incorrect username or password" />
{/if}
<div class="flex-item">
  <h1>Please Login to Continue</h1>
</div>
<AuthForm buttonText="Login" bind:focus {submit} />
