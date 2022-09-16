<script>
  import api from "../../lib/api"
  import {hostState, status, updater} from "../../stores"

  export let server

  const getIp = server => {
    const port = server.public.port
    return port == 25565 ? $hostState.ip : `${$hostState.ip}:${port}`
  }

  const startServer = async server => {
    try {
      await api("post", "/api/query/start", {id: server.public.id})
      await updater.run()
    } catch (error) {
      console.log(error)
    }
  }
</script>

<div class="flex-item">
  {#if server.state.loading}
    <h3>Loading...</h3>
  {:else if server.state.isOn}
    <h3>{server.public.edition} Edition - {server.public.version}</h3>
    <h3>IP - {getIp(server)}</h3>
    {#if server.state.playerCount > 0}
      <h3>{server.state.playerCount} online</h3>
    {:else}
      <h3>0 online - {server.state.minutesLeft.toFixed(1)} Mins Left</h3>
    {/if}
  {:else}
    <div class="flex-item">
      <button
        disabled={!$status.isOn}
        on:click={event => {
          event.currentTarget.disabled = true
          startServer(server)
        }}>Start Server</button
      >
    </div>
  {/if}
</div>

<style>
  button {
    margin: 10px 0;
  }

  h3 {
    margin: 7px 0;
  }
</style>
