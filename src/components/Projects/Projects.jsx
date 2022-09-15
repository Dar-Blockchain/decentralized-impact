import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
const Projects = () => {
    const [projects, setProjects] = useState([])
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('')

    const getProjects = async () => {
        const resp = await axios.get('https://decentralized-impact.alwaysdata.net/project/getprojects')  
        console.log(resp)
        setProjects(resp.data.project)
        setLoader(false)
    }


    useEffect(() => {
        if (loader === true){
          getProjects()
        }
        
    }, [projects])











return (
    <div>
        {
            loader === true ? (
                <Spinner />
            ):(
                projects.map((value, index) => {
                    
                }) 
            )
        }
    </div>
  )
}

export default Projects