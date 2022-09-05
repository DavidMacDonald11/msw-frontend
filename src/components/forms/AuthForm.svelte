<script>
  export let buttonText
  export let focus
  export let submit

  const submitForm = event => {
    const form = {}
    const formData = new FormData(event.target)
    event.target.reset()

    for (let field of formData) {
      const [key, value] = field
      form[key] = value
    }

    submit(form)
  }
</script>

<div class="flex-item">
  <form on:submit|preventDefault={submitForm}>
    <div class="form-item">
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        required
        bind:this={focus}
      />
    </div>
    <div class="form-item">
      <input type="password" id="password" name="password" placeholder="Password" required />
    </div>
    <div class="form-item">
      <button>{buttonText}</button>
    </div>
  </form>
</div>

<style>
  .form-item {
    font-family: inherit;
    padding: 6px 0;
  }

  .form-item input {
    background-color: #f5f5f5;
    border: 2px solid #888888;
    border-radius: 5px;
    color: #222222;
    font-family: inherit;
    min-height: 19px;
    min-width: 200px;
    outline: none;
    text-align: center;
  }

  .form-item input::placeholder {
    color: #888888;
    font-family: inherit;
    text-align: center;
  }

  .form-item input:focus {
    background-color: #fcfcfc;
    border: 2px solid black;
    color: black;
  }

  .form-item input:focus::placeholder {
    color: #898989;
  }

  .form-item button {
    background-color: #f0f0f0;
    border: 2px solid #888888;
    border-radius: 4px;
    display: block;
    font-family: inherit;
    margin: 0 auto;
    outline: none;
    padding: 4px 8px;
    text-align: center;
  }

  .form-item button:hover {
    background-color: #eaeaea;
  }

  .form-item button:active {
    border: 2px solid black;
  }
</style>
