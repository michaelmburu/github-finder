import axios from 'axios'

const GITHUB_URL = 'https://api.github.com'
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
console.log(GITHUB_TOKEN)
const github = axios.create({
  baseURL: GITHUB_URL,
  Authorization: `Bearer ${GITHUB_TOKEN}`,
})

// Search Profile
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (login) => {
  const sortParams = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const [user, repos] = await Promise.all([
    await github.get(`/users/${login}`),
    await github.get(`/users/${login}/repos?${sortParams}`),
  ])

  return { user: user.data, repos: repos.data }
}
