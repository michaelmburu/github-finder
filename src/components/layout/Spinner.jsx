import React from 'react'
import spinner from './assets/spinner.jpeg'

const Spinner = ({text}) => {
  return (
    <div className='w-100 mt-20'>
        <img width={100} height={100} className='text-center mx-auto' src={spinner} alt="loading spinner"/>
        <p className='text-center mx-auto font-bold'>{text}</p>
    </div>
  )
}

export default Spinner