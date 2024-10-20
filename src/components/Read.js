import React from 'react'
import Graph from './Graph'
import Form from './Form'
import PageTitle from './PageTitle';


function Read() {
    return (
       
      <div className="min-h-screen bg-customBlack">
        
        <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-primaryText py-8">
            
          {/* Grid for Graph and Form */}
          <div className="grid md:grid-cols-2 gap-8">
            <Graph />
            <Form />
          </div>
        </div>
      </div>
    );
  }
  

export default Read