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
  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import { useCheckboxGroup } from '@chakra-ui/react'

const Users = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState()
    const [currentExpert, setCurrentExpert] = useState()
    const [usersType, setUserType] = useState(["Expert","Commuinitymemeber","Projectholder", ""])
    const [loaderState, setLoaderState] = useState(true)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState('')
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: ['Expert'],
  })

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

            console.log('holaaa')
          })
      }
    
    //   return () => {
    //     second
    //   }
    }, [users])
    


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

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
      <Menu closeOnSelect={false}>
      <MenuButton as={Button} color='#8F9BBA' w={'32'}>
        Filter
      </MenuButton>
      <MenuList minWidth='240px'>
      <MenuOptionGroup onChange={(e)=>{setUserType(e)}} title='Type' type='checkbox'>
          <MenuItemOption value='Expert'>Expert</MenuItemOption>
          <MenuItemOption value='Commuinitymemeber'>Commuinity memeber</MenuItemOption>
          <MenuItemOption value='Projectholder'>Project holder</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
        {users ? (
            users.map(
                (user, index) => {
                        if (usersType.includes(user.usertype))
                        return (
                            <Banner
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