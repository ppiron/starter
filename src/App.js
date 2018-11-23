import React from 'react';
import { useState, useEffect } from 'react'
import '../public/style.css';

export default function App() {
  const [projects, setProject] = useState([])
  let pros
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        console.log(json[0])
        setProject((prevProjects) => {
          const newProjects = [...prevProjects, ...json]
          pros = newProjects.map((project) => {
            return (
              <p key={project.id} className='text-red-darker text-sm'>{project.name}</p>
              )
            })
          console.log(pros, newProjects)
          return newProjects
        })
      })
  }, [])

  return (
    <React.Fragment>
      <div className='container mx-auto px-4 py-4'>
        <h1 className="text-center text-orange-dark ">Ciao Pluto!</h1>
        <p className='text-green-dark'>Ciao, sono Pluto!</p>
        {(projects.length > 0) ? <p className='text-blue'>There are {projects.length} users:</p> : <p>pippo</p>}
        {(projects.length > 0) ? 
          console.log(projects) :
          <p>pippa</p>}
      </div>
    </React.Fragment>
  )
}