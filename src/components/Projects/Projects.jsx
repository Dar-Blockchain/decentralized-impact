import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@chakra-ui/icons'
// import ComplexTable from "views/admin/default/components/ComplexTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

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
    const [currentProject, setCurrentProject] = useState('')
    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    const getProjects = async () => {
        const resp = await axios.get('http://localhost:3000/project/getprojects')  
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
const { isOpen, onOpen, onClose } = useDisclosure()

return (
    <div>
        {
            loader === true ? (
                <Spinner />
            ):(
<><Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
<ModalOverlay />
<ModalContent>
  <ModalHeader>{currentProject.title}
              <Badge ml='1.5' variant='subtle' colorScheme='green' >{currentProject.state}</Badge>
  </ModalHeader>
  <ModalCloseButton />
  <ModalBody>
    <Text fontWeight='bold' mb='1rem'>
    {currentProject.description}
    </Text>

    <button onClick={() => openInNewTab(currentProject.descriptionFileUrl)}>
    Project description <ExternalLinkIcon mx='2px' />
    </button>
    </ModalBody>
  {
    JSON.parse(localStorage.getItem('CurrentUserData')).userType === 'Admin' && (
      <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Approve
      </Button>
      <Button variant='ghost'>Decline</Button>
    </ModalFooter>
    )
  }

</ModalContent>
</Modal>
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
                    return (<Tr key={index}>
                    <Td  onClick={()=>{onOpen()
                    setCurrentProject(value)
                    console.log(currentProject)
                  }}  color={textColor} fontSize='sm' fontWeight='700'>{value.title}</Td>
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
                </Table></>
                )
            }        
    </div>
  )
}

export default Projects