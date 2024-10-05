import React from 'react'
import Graph from './Graph'
import Form from './Form'


function Read() {
  return (
    <div className="App bg-customBlack">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-primaryText ">

      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
          {/* Chart */}
          <Graph></Graph>
          {/* Form */}
          <Form></Form>
        </div>

    </div>

   </div>
  )
}

export default Read