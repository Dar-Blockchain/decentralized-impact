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
import { Calendar } from 'react-calendar'
  
const Experts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState()
    const [currentExpert, setCurrentExpert] = useState({firstName: ''})
    const [error, setError] = useState(false)
    const [modalState, setModalState] = useState('default')
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
                      }).catch((err) => {
            setError(true)
            console.error(err)
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
    {
      modalState === "default" ? (
        <ModalContent>
        <ModalHeader>{currentExpert.firstName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            expert description placeholder
          </ModalBody>
    
          <ModalFooter>
            <Button mr={3}  variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={() => {setModalState('bookmeeting')}} >Book a meeting</Button>
          </ModalFooter>
        </ModalContent>
    
      ):(
 
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Calendar />
      </ModalBody>

      <ModalFooter>
        <Button mr={3}  variant='ghost' onClick={onClose}>
          Close
        </Button>
        <Button colorScheme='blue' >Submit</Button>
      </ModalFooter>
    </ModalContent>
      )
    }

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
                    if (user.usertype === "Expert")
                    {
                        return (
                            <Banner
                            action={
                              () => {
                                setCurrentExpert(user)
                                onOpen()
                              }
                            }
                            onClick={() => console.log(user)}
                            cursor='pointer'
                            key={index}
                            name= {user.firstName + " " + user.lastName}
                            job={user.usertype}      
                            />                     
                    )
                    }

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

export default Experts