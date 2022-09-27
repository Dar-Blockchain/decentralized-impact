import React from 'react'
import Banner from 'components/card/Mastercard'
import { Flex, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Users = () => {

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
                Authorization: `${localStorage.getItem('userToken')}`
            }
        }).then((res) => {
            setUsers(res)
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
    <Flex direction={'column'}>
        <Flex>
        {users ? (
           <Banner 
           name="tessst"
           job='test'
          posts='17'
          followers='9.7k'
          following='274'
           /> 
        ):(
            <>
            {error === true ? (<h1>errMessage</h1>):(<Spinner/>)}
            </>
            )}
        </Flex>
    </Flex>
  )
}

export default Users