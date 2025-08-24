import React from 'react'
import SpinnerSm from './SpinnerSm'

const SpinnerModal = () => {
  return (
    <div className="bg-secondary !h-full !w-full absolute z-50 opacity-20 flex justify-center items-center">
        <SpinnerSm className="h-20 w-20 border-8 border-blue-700 " />
      </div>
  )
}

export default SpinnerModal