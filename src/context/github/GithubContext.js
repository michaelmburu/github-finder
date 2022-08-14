import React, { createContext, useState } from 'react'

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [loading, setIsLoading] = useState(true)
    
    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: ` token ${GITHUB_TOKEN}`
            }
            })
        
            const data = await response.json()
            setUsers(data)
            setIsLoading(false)
    }

    return (
        <GitHubContext.Provider 
        value={{
            users, 
            loading,
            fetchUsers
        }}
        >
            {children}
        </GitHubContext.Provider>
    )
}

export default GitHubContext