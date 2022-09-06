import axios from "axios"

async function api(method, url, data = undefined) {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"))

    const res = await axios({
      method,
      url,
      headers: { authorization: `Bearer ${user.token}` },
      data
    })

    return res.data
  } catch (error) {
    throw error.response?.data.error || error
  }
}

export default api
