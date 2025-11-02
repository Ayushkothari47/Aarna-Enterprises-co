import React from 'react'
import Packages from '../components/Packages.jsx'
import Suggestions from '../components/Suggestions.jsx'

function HomePage() {
  return (
    <div>
        <div className='bg-gray-950'>
        <Packages/>
        <Suggestions/>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default HomePage