<script>
  import api from "../lib/api"
  import {servers, state, status, updater} from "../stores"

  const getIp = server => {
    const port = server.public.port
    return port == 25565 ? $state.ip : `${$state.ip}:${port}`
  }

  const startServer = async server => {
    try {
      server.state.loading = true

      await api("post", "/api/query/start", {id: server.public.id})
      await updater.run()
    } catch (error) {
      console.log(error)
    }
  }
</script>

<div class="flex-container horizontal {$status.isOn ? '' : 'not-visible'}">
  {#each $servers as server}
    <div class="flex-item server small">
      <div class="flex-item">
        <h2>{server.public.name}</h2>
        <p>{server.public.description}</p>
      </div>
      <hr class="flex-item" />
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
            on:click={() => {
              startServer(server)
            }}>Start Server</button
          >
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .flex-item.server {
    background-color: #ddfcee;
    border: 1px solid;
    border-radius: 8px;
    margin: 20px;
  }

  .flex-item.server button {
    margin: 10px 0;
  }

  .flex-item.server h3 {
    margin: 7px 0;
  }

  .not-visible > * {
    opacity: 50%;
  }
</style>
