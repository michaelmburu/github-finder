import React, { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'

const GitHubContext = createContext()

export const GithubProvider = ({children}) => {
    
    const initialState = {
        users: [],
        repos: [],
        user: {},
        loading: false
    }
    
    const [state, dispatch] = useReducer(GithubReducer, initialState)
    
    return (
        <GitHubContext.Provider 
        value={{
            ...state,
            dispatch,
        }}
        >
            {children}
        </GitHubContext.Provider>
    )
}

export default GitHubContext