<script>
  import {onDestroy, onMount} from "svelte"
  import {updater} from "../stores"
  import Error from "./Error.svelte"
  import Status from "./Status.svelte"
  import Servers from "./Servers.svelte"

  onMount(updater.run)
  onDestroy(updater.clear)
</script>

{#if $updater.failed}
  <Error message="Lost connection to server" />
{/if}

<Status />
<Servers />
