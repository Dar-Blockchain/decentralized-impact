import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import ComplexTable from "views/admin/default/components/ComplexTable";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"




const Projects = () => {



    const columnsDataComplex = [
        {
          Header: "NAME",
          accessor: "name",
        },
        {
          Header: "STATUS",
          accessor: "status",
        },
        {
          Header: "DATE",
          accessor: "date",
        },
        {
          Header: "PROGRESS",
          accessor: "progress",
        },
      ];
    
    const [tableData, setTableData] = useState([])
    const [projects, setProjects] = useState([])
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('')

    const getProjects = async () => {
        const resp = await axios.get('https://decentralized-impact.alwaysdata.net/project/getprojects')  
        setProjects(resp.data.project)
        console.log(resp)
        console.log('hello')
        setLoader(false)
      }


        useEffect(() => {
            if (loader === true){
            getProjects()
            }
            
        }, [projects])


    // const tableDataComplex = [
    //     {
    //       "name":"Horizon UI PRO",
    //       "status": "Approved",
    //       "date": "18 Apr 2022",
    //       "progress": 75.5  
    //     }
    //   ]
//     <ComplexTable
//     columnsData={columnsDataComplex}
//     tableData={tableDataComplex}
//   />






return (
    <div>
        {
            loader === true ? (
                <Spinner />
            ):(
            <Table variant="simple" mt={'84px'}>
                <TableCaption>Projects</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Title</Th>
                    <Th>category</Th>
                    <Th isNumeric>state</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {
                    projects.map((value, index) => {
                        console.log(value)
                    return (<Tr key={index}>
                    <Td>{value.title}</Td>
                    <Td>{value.category}</Td>
                    <Td>{value.state}</Td>
                    </Tr>)
                })}
                </Tbody>
                </Table>
                )
            }        
    </div>
  )
}

export default Projects