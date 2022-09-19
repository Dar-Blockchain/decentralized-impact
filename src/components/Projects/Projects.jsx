import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
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


  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";


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
// On_hold,
//         Published,
//         Accepted,
//         Refused,
//         under_revision,
//         selected



const textColor = useColorModeValue("secondaryGray.900", "white");
const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

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
                    <Th 
                    pe='10px'
                    borderColor={borderColor}
                    >Title</Th>
                    <Th
                    pe='10px'
                    borderColor={borderColor}>state</Th>

                    <Th
                    pe='10px'
                    borderColor={borderColor}
                    >category</Th>
                    <Th
                    pe='10px'
                    borderColor={borderColor}
                    >Date</Th>

                    </Tr>
                </Thead>
                <Tbody>
                {
                    projects.map((value, index) => {
                        console.log(value)
                    return (<Tr key={index}>
                    <Td color={textColor} fontSize='sm' fontWeight='700'>{value.title}</Td>
                    <Td
                    display={'flex'}
                    color={
                      value.state === "Approved"
                        ? "green.500"
                        : value.state === "Disable"
                        ? "red.500"
                        : value.state === 'incubation'
                        ? "blue.500"
                        : value.state === "Error"
                        ? "orange.500"
                        : null
                    }
                    >
                    <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          
                          color={
                            value.state === "incubation"
                              ? "green.500"
                              : value.state === "Disable"
                              ? "red.500"
                              : value.state === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            value.state === "incubation"
                              ? MdCheckCircle
                              : value.state === "Disable"
                              ? MdCancel
                              : value.state === "Error"
                              ? MdOutlineError
                              : null
                          }/>
                    {value.state}</Td>
                    <Td color={textColor} fontSize='sm' fontWeight='700'>{value.category}</Td>
                    <Td color={textColor} fontSize='sm' fontWeight='700'>{new Date(value.createdAt).toLocaleDateString()}</Td>
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