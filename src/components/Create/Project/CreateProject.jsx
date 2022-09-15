import React, { useState } from 'react'
import { Flex, Button, FormControl,Input, FormHelperText,FormLabel,Box ,Select, option, CheckboxGroup } from '@chakra-ui/react'
import axios from 'axios'

const CreateProject = () => {
  const [teamMembers, setTeamMembers] = useState([''])

  const addHandler = () => {
    setTeamMembers([...teamMembers, ''])
  }

  const setTeamMember = (e) => {
      const newArr = teamMembers
      newArr[e.target.id] = e.target.value
      console.log(newArr)
      setTeamMembers(newArr)
}

  const titleHandler =  
  const [project, setProject] = useState(
    {
      title: "",
      category: "",
      teamMemberEmails: teamMembers,
      description: "",
      descriptionFileUrl:"",
      state: ""
  }
  )
  const postProject = () => {
    axios.post('https://decentralized-impact.alwaysdata.net/project/addproject', project).then((resp) => {
      console.log(resp)
    }).then((err) => {
      console.log(err)
    })
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
    <Flex 
    direction='column'
    w={{ base: "100%", md: "420px" }}
    maxW='100%'
    background='transparent'
    borderRadius='15px'
    mx={{ base: "auto", lg: "unset" }}
    me='auto'
    mb={{ base: "20px", md: "auto" }}
    alignSelf='center'
    >
    <FormControl id="projecTitle">
      <FormLabel>Project title</FormLabel>
      <Input type="text" />
    </FormControl>
    <FormControl id="teamMemberEmails">
      <FormLabel>team memebers email</FormLabel>
      <Flex className='teamMemberInSection' direction={'column'}  >
        {teamMembers.map((value, index) => {
          return(<Input onChange={setTeamMember} id={index}  type="email" />)
        })}
      </Flex>
      <Button onClick={addHandler}>Add</Button>
      <FormHelperText>add one more memeber by pressing the add button</FormHelperText>
    </FormControl>
    <FormControl id="description">
      <FormLabel>Project Description</FormLabel>
      <Input type="text" />
      <FormHelperText>Project description</FormHelperText>
    </FormControl>
    <Select placeholder='Select project category'>
      <option value='FOOD & HEALTHCARE'>FOOD & HEALTHCARE</option>
      <option value='ENERGY & ENVIRONMENT'>ENERGY & ENVIRONMENT</option>
      <option value='LOGISTICS & MOBILITY'>LOGISTICS & MOBILITY</option>
      <option value='FINANCIAL INCLUSION'>FINANCIAL INCLUSION</option>
      <option value='CREATIVE INDUSTRIES'>CREATIVE INDUSTRIES</option>
      <option value='SOCIAL & CIVIC TECH'>SOCIAL & CIVIC TECH</option>
  </Select>
    </Flex>
    </Box>
  )
}

export default CreateProject