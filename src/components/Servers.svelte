<script>
  import {servers, status} from "../stores"
  import State from "./server/State.svelte"
</script>

<div class="flex-container horizontal {$status.isOn ? '' : 'not-visible'}">
  {#each $servers as server}
    <div class="flex-item server small">
      <div class="flex-item">
        <h2>{server.public.name}</h2>
        <p>{server.public.description}</p>
      </div>
      <hr class="flex-item" />
      <State {server} />
    </div>
  {/each}
</div>

<style>
  .server {
    background-color: #ddfcee;
    border: 1px solid black;
    border-radius: 8px;
    margin: 20px;
  }

  .not-visible > * {
    opacity: 50%;
  }
</style>
