import axios from "axios"

async function api(method, url, data = undefined) {
  const user = JSON.parse(localStorage.getItem("user"))

  try {
    const res = await axios({
      method,
      url,
      headers: { authorization: `Bearer ${user.token}` },
      data
    })

    return res.data
  } catch (error) {
    throw error.response.data.error
  }
}

export default api
