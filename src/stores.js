import api from "./lib/api"
import { writable } from "svelte/store"

function newLocalStore(key, defaultValue) {
  const store = writable(JSON.parse(localStorage.getItem(key)) || defaultValue)
  store.subscribe(value => { localStorage.setItem(key, JSON.stringify(value)) })
  return store
}

const servers = newLocalStore("servers", [])

const state = newLocalStore("state", {
  clock: 0,
  delaySeconds: 30,
  totalMinutes: 15,
  ip: null
})

const status = newLocalStore("status", {
  failed: false,
  waiting: false,
  isOn: false,
  anyOn: false
})

const updaterStore = writable({
  id: null,
  failed: false
})

const updater = {
  subscribe: updaterStore.subscribe,
  clear: () => {
    updaterStore.update(self => {
      clearInterval(self.id)
      self.id = null
      return self
    })
  },
  run: async () => {
    updater.clear()

    try {
      const res = await api("get", "/api/query/status")
      res.state.ip = res.ip

      servers.update(() => res.servers)
      state.update(() => res.state)
      status.update(() => res.status)

      updaterStore.update(self => {
        self.failed = false
        return self
      })
    } catch (error) {
      updaterStore.update(self => {
        self.failed = true
        console.log(error)
        return self
      })
    } finally {
      updaterStore.update(self => {
        self.id = self.id || setInterval(updater.run, 15000)
        return self
      })
    }
  }
}

export { servers, state, status, updater }
