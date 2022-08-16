import React from 'react'

const GITHUB_URL = "https://api.github.com"

   // Search Profile
    export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const {items} = await response.json()

    return items
}


export const getUser = async (login) => {

    const userResponse = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if(userResponse.status === 404) {
        window.location = '/notfound' 
    } else if(userResponse.status === 403) {
        window.location = '/ratelimit'
    }
    else {
        const userdata = await userResponse.json()
        
        return userdata
    }       
}

export const getUserRepos = async (login) => {

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const reposResponse = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if (reposResponse.status === 404) {
        window.location = './notfound'
    } else if(reposResponse.status === 403) {
        window.location = '/ratelimit'
    }
    else{
        const reposdata = await reposResponse.json()

        return reposdata
    }
   
}



