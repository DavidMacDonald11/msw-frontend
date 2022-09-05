<script>
  export let message
</script>

<div class="flex-item">
  <div class="error">
    <h3>{message}</h3>
  </div>
</div>

<style>
  .error {
    background-color: #fa5f5f;
    border-radius: 6px;
    color: white;
    height: 25px;
    padding: 0px 10px;
  }
</style>
