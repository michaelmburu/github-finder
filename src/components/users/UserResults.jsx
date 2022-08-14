import React from 'react'
import { useContext } from 'react'
import GitHubContext from '../../context/github/GithubContext'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

const UserResults = () => {
    const {loading, users, } = useContext(GitHubContext)
   
  return (
    <>
        {
            !loading ?  <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:gr-cols-3 md:grid-cols-2' >
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
            </div> : <Spinner text="Loading Users.." />
        }
    </>
  )
}

export default UserResults