<script>
  import axios from "axios"
  import Error from "../Error.svelte"
  import AuthForm from "./AuthForm.svelte"

  export let focus

  let failed = false

  const submit = async form => {
    try {
      await axios.post("/api/auth/signup", form)
      failed = false
    } catch (error) {
      failed = true
    }
  }
</script>

{#if failed}
  <Error message="That username is taken" />
{/if}
<div class="flex-item">
  <h1>Create Account</h1>
</div>
<AuthForm buttonText="Create" bind:focus {submit} />
