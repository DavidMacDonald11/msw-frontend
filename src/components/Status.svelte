<script>
  import {state, status, updater} from "../stores"
  import api from "../lib/api"
  import Error from "./Error.svelte"

  $: minutesLeft = $state.totalMinutes - ($state.clock * $state.delaySeconds) / 60.0

  const wake = async () => {
    try {
      await api("post", "/api/query/wake")
      await updater.run()
    } catch (error) {
      console.log(error)
    }
  }
</script>

{#if $status.failed}
  <Error message="The host computer failed to wake" />
{/if}

{#if $status.waiting}
  <div class="flex-item">
    <h3>Waiting for wake...</h3>
  </div>
{/if}

<div class="flex-item medium">
  {#if $status.isOn}
    <h3>The host computer is on.</h3>
    <h3>
      If no servers are online, the host will shut itself down after 15 minutes to save energy. Each
      server will shut itself down if no one is online for 30 minutes.
    </h3>
    {#if !$status.anyOn}
      <div class="flex-item">
        <h3>{minutesLeft.toFixed(1)} Mins Left</h3>
      </div>
    {/if}
  {:else if !$status.waiting}
    <h3>The host computer is currently off to save energy.</h3>
    <button on:click={wake}>Wake Host</button>
  {/if}
</div>
