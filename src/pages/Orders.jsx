import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  
  const getProjects = async () => {
    const resp = await axios.get('https://decentralized-impact.alwaysdata.net/project/getprojects')  
    setProjects(resp.data.project)
    console.log(resp)
    setLoading(false)
  }

  useEffect(() => {
    if (loading === true){
      getProjects()
    }
    
}, [projects])
            // {
            // "value": [
            //     {
            //         "_id": "63186d8332c934a809eaa506",
            //         "title": "Friends",
            //         "category": "finance",
            //         "teamMemberEmails": [
            //             "adam@gmail.com",
            //             "youssef@gmail.com"
            //         ],
            //         "description": "hi world",
            //         "state": "incubation",
            //         "descriptionFileUrl": "An Url",
            //         "isConfirmed": false,
            //         "__v": 0
            //     }
            // ]
            // }
  
  return (

    <div className="container text-center">
    <div className="row">
    {
      loading ? ('error'):projects.map((project, index) => {
       return(
        <div className="col-2" key={index}>
        <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          <a href="#" className="btn btn-primary">{project.isConfirmed}</a>
        </div>
      </div>
        </div>

       )
      }) 
    }
      
    
    
      </div>
    </div>
  
  )
}

export default Orders