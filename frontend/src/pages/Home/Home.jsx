import React from 'react'
import Notecard from '../../components/Cards/Notecard'

const Home = () => {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5'>
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      </div>
    </div>
  )
}

export default Home