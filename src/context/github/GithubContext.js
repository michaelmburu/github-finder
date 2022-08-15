import React, { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    
    const initialState = {
        users: [],
        repos: [],
        user: {},
        loading: false
    }
    
    const [state, dispatch] = useReducer(GithubReducer, initialState)
    
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
        
    }

    const getUser = async (login) => {
        setLoading()

        const userResponse = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const reposResponse = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(reposResponse.status === 404) {
            window.location = '/notfound' 
        }
        else {
            const userdata = await userResponse.json()
            const reposdata = await reposResponse.json()

            dispatch({
                type: 'GET_USER',
                payload: userdata
            })
            dispatch({
                type: 'GET_REPOS',
                payload: reposdata
            })
        }       
    }

    const clearSearchUsers = async () => {
        dispatch({
            type: 'CLEAR_USERS',
            payload: []
        })
    }
   /*  const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: ` token ${GITHUB_TOKEN}`
            }
            })
        
            const data = await response.json()
            
            dispatch({
                type: 'GET_USERS',
                payload: data
            })

        
    }
     */

    //Set Loading
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    return (
        <GitHubContext.Provider 
        value={{
            users: state.users, 
            repos: state.repos,
            user: state.user,
            loading: state.loading,
            searchUsers,
            clearSearchUsers,
            getUser,
        }}
        >
            {children}
        </GitHubContext.Provider>
    )
}

export default GitHubContext