import React from 'react'
import Options from './Options'

const Footer = () => {
  return (
    <div className="row Footer">
      <div className="col-3">
        <Options />
      </div>
      <div className="col-9">
        {/* <ExerciseMistakes /> */}
        Exercise mistakes
      </div>
    </div>
  )
}

export default Footer