import React from 'react';
import { useState, useEffect } from 'react'
import '../public/style.css';

export default function App() {
  const [projects, setProject] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setProject(json))
  }, [])

  return (
    <React.Fragment>
      <div className='container mx-auto px-4 py-4 font-sans'>
        <h1 className="text-center text-orange-dark ">Ciao Pluto!</h1>
        <p className='text-green-dark'>Ciao, sono Pluto!</p>
        {(projects.length > 0) ? <p className='text-blue'>There are {projects.length} users:</p> : <p></p>}
        {(projects.length > 0) ? <ProjectList projects={projects} /> : <p></p>}
      </div>
    </React.Fragment>
  )
}

function ProjectList (props) {
  const [user, setUser] = useState(null)
  const [showAddress, setShowAddress] = useState(false)
  const [showCompany, setShowCompany] = useState(false)

  function showUser(index) {
    setUser(props.projects[index])
    // setShowAddress(false)
    // setShowCompany(false)
  }

  function toggleAddress() {
    setShowAddress(!showAddress)
  }

  function toggleCompany() {
    setShowCompany(!showCompany)
  }

  return (
    <div className='gridded'>
      <ul className='list-reset mt-2 pl-2'>
        {props.projects.map( (project, index) => {
          return (
            <li 
              className={`mt-1 cursor-pointer hover:underline hover:text-blue ${(user && (index === user.id - 1)) && 'text-blue font-bold'}`}
              key={project.id}
              onClick={() => showUser(index)}>
                {project.name}
            </li>
          )
        })}
      </ul>
      <div className='mt-4'>
        {user && 
          (
            <div>
              <div  className='p-2 shadow font-medium'>
                <p className='mt-1'>Username: {user.username}</p>
                <p className='mt-1'>Email: {user.email}</p>
              </div>
              <div className="mt-2 p-2 shadow subgridded">
              <p className='cursor-pointer font-medium hover:underline hover:text-blue' onClick={() => toggleAddress()}>Address</p>
                <div className='text-blue-darker'>{(showAddress) && <UserAddress address={user.address} />}</div>
              </div>
              <div className="mt-1 p-2 shadow subgridded">
              <p className='cursor-pointer font-medium hover:underline hover:text-blue' onClick={() => toggleCompany()}>Company</p>
                <div className='text-blue-darker'>{(showCompany) && <UserCompany company={user.company} />}</div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
  
}

function UserAddress(props) {
  const { street, city, zipcode} = props.address

  return(
    <>
      <p>Street: {street}</p>
      <p>City: {city}</p>
      <p>Postal Code: {zipcode}</p>
    </>
  )
}

function UserCompany(props) {
  const { name, catchPhrase, bs } = props.company

  return (
    <>
      <p>Name: {name}</p>
      <p>Catchphrase: {catchPhrase}</p>
      <p>Business: {bs}</p>
    </>
  )
}