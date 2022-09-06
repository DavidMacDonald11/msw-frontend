<script>
  import axios from "axios"
  import {user} from "../../stores"
  import Error from "../Error.svelte"
  import AuthForm from "./AuthForm.svelte"

  export let focus

  let failed = false

  const submit = async form => {
    try {
      const res = await axios.post("/api/auth/login", form)

      user.update(() => ({
        name: form.username,
        loggedIn: true,
        token: res.data.token
      }))

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
