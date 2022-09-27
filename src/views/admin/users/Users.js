import React from 'react'
import Banner from "../../../views/admin/profile/components/Banner"
import { Flex, Spinner, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  
const Users = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState()
    const [usersType, setUserType] = useState('')
    const [loaderState, setLoaderState] = useState(true)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
      if (!(users)){
        axios.get("http://localhost:3000/api/",
        {
            headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
            //     token: `${JSON.parse(localStorage.getItem('userToken'))}`,
            //     userId: `${JSON.parse(localStorage.getItem('CurrentUserData'))._id}`
             
        }
        }).then((res) => {
            setUsers(res.data.users)
            setLoaderState(false)
            console.log(users)
          }).catch((err) => {
            setError(true)
            setErrMessage(err)
            console.error(err)
            console.log('holaaa')
          })
      }
    
    //   return () => {
    //     second
    //   }
    }, [users])
    


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        content Test 
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    <Flex
    direction={'column'}
    templateColumns={{
        base: "2fr",
        lg: "1.34fr 1fr 1.62fr",
      }}
      templateRows={{
        base: "repeat(3, 1fr)",
        lg: "1fr",
      }}
      gap={{ base: "20px", xl: "20px" }}>
        {users ? (
            users.map(
                (user, index) => {
                    return (
                        <Banner
                        action={onOpen}
                        cursor='pointer'
                        key={index}
                        name= {user.firstName + " " + user.lastName}
                        job={user.usertype}      
                        />                     
                )
            })
        ):(
            <>
            {error === true ? (<h1>errMessage</h1>):(<Spinner/>)}
            </>
            )}
        </Flex>
    </Box>
  )
}

export default Users