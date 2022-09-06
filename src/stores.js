import api from "./lib/api"
import { writable } from "svelte/store"

function newStore(location, key, defaultValue) {
  const store = writable(JSON.parse(location.getItem(key)) || defaultValue)
  store.subscribe(value => { location.setItem(key, JSON.stringify(value)) })
  return store
}

function newSessionStore(key, defaultValue) {
  return newStore(sessionStorage, key, defaultValue)
}

function newLocalStore(key, defaultValue) {
  return newStore(localStorage, key, defaultValue)
}

const user = newSessionStore("user", {
  name: null,
  loggedIn: false,
  token: null
})

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
      const res = await api("post", "/api/query/status")
      res.state.ip = res.ip

      servers.update(() => res.servers)
      state.update(() => res.state)
      status.update(() => res.status)

      updaterStore.update(self => {
        self.failed = false
        return self
      })
    } catch (error) {
      console.log(error)

      updaterStore.update(self => {
        self.failed = true
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

export { user, servers, state, status, updater }
