import React from 'react'
import {FaTwitter} from 'react-icons/fa'
const About = () => {
  return (
    <div>
      <h1 className="text-6xl mb-4">
        <p className='mb-4 text-2xl font-light'>
          This is an app to search GitHub profiles and see profile details. 
        </p>
        <p className='text-lg '>
          Version <span className='text-white'>1.0.0</span>
        </p>
        <p className='text-lg'>
          FrontEnd Engineer:
          <a className='mx-2' href='https://twitter.com/codercety'>
            Michael Mburu   
            <FaTwitter className='inline pr-2 mx-2 text-3xl' />
          </a>
         
        </p>
      </h1>
    </div>
  )
}

export default About