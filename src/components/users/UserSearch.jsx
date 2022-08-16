import React from 'react'
import { useState, useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import GitHubContext from '../../context/github/GithubContext'
import {searchUsers} from '../../context/github/GithubActions'

const UserSearch = () => {

    const[text, setText] = useState('')

    const handleSearchChange = (e) => setText(e.target.value)

    const {users, dispatch,} = useContext(GitHubContext)
    
    const {setAlert} = useContext(AlertContext)

    const handleSearchSubmit = async (e) => {
        e.preventDefault()

        if(text === '') {
            setAlert('Enter a profile name', 'error')
        } else {
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})
            setText('')
        }
    }

    const handleClearSearch = () => {

        setText('')
        dispatch({type: 'CLEAR_USERS', payload: []})

    }

    
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSearchSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black"
                            placeholder='Search name'
                            value={text}
                            onChange={handleSearchChange}
                            />
                            <button 
                            type='submit' 
                            className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                            Go
                        </button>
                        </div>
                    
                    </div>
                </form>
            </div>
                {users.length > 0 && (  <div>
                    <button onClick={handleClearSearch} className="btn btn-ghost btn-lg">
                        Clear
                    </button>
                </div>
            )}        
        </div>
    )
}

export default UserSearch