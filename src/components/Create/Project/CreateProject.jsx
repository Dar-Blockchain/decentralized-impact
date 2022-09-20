import React, { useState } from 'react'
import { Flex, Button, FormControl,Input, FormHelperText,FormLabel,Box ,Select, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from 'react'
import { words } from 'lodash'

const CreateProject = () => {
  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')
  const [fileImg, setFileImg] = useState(null);
  const [teamMembers, setTeamMembers] = useState([''])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const addHandler = () => {
    setTeamMembers([...teamMembers, ''])
  }
  







  const setTeamMember = (e) => {
      const newArr = teamMembers
      newArr[e.target.id] = e.target.value
      console.log(newArr)
      setTeamMembers(newArr)
      setProject({...project, teamMemberEmails: newArr })
}

  

      useEffect(() => {
        if(window.ethereum){
          window.ethereum.request({method:'eth_requestAccounts'})
          .then(res=>{
                  // Return the address of the wallet
                  console.log(res) 
          })          
        }
        else {
          window.alert('Install metamask')
        }

      })
      

  
  const [project, setProject] = useState(
    {
      title: "",
      category: "",
      teamMemberEmails: [],
      description: "",
      descriptionFileUrl:"",
      state: "incubation"
  }
  )

  const sendFileToIPFS = async (e) => {
    setFileImg(e.target.files[0])
    console.log(e)
    if (fileImg) {
        try {

            const formData = new FormData();
            formData.append("file", fileImg);
            console.log(process.env)
            console.log(process.env.API_SECRET)
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': 'a1172ef17e335f1e93a2',
                    'pinata_secret_api_key': '9a58881e52bb27a3690f444adce68bf6308a7e39c92164413b3e35bf3e5f11d4',
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
            setProject({...project, descriptionFileUrl: ImgHash })
            
            console.log(ImgHash);
//Take a look at your Pinata Pinned section, you will see a new file added to you list.   



        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}



  const postProject = () => {
    setLoader(true)
    axios.post('https://decentralized-impact.alwaysdata.net/project/addproject', project).then((resp) => {
      console.log(resp)
      setLoader(false)
    }).then((err) => {
      console.log(err)
      setErrorMessage(err)
      setError(true)
      setLoader(false)
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
    alignContent='center'
    alignItems='center'
    mx='auto'
    padding={'16'}
    border={'1px'}
    justifyContent='space-around'
    >
    {loader === true ? (<Spinner />):(
      <Flex direction={'column'}>
      <FormControl  id="projecTitle">
      <FormLabel>{error === true ? (errorMessage):('Project title')}</FormLabel>
      <Input onChange={(e) => setProject({...project, title: e.target.value })} color={'white'} type="text" />
    </FormControl>
    <FormControl id="teamMemberEmails">
      <FormLabel>team memebers email</FormLabel>
      <Flex justifyContent={'space-around'} className='teamMemberInSection' direction={'column'}  >
        {teamMembers.map((value, index) => {
          return(<Input color={'white'} my={'1.5'} onChange={setTeamMember} id={index}  type="email" />)
        })}
      </Flex>
      <Button onClick={addHandler}>Add</Button>
      <FormHelperText>add one more memeber by pressing the add button</FormHelperText>
    </FormControl>
    <FormControl id="description">
      <FormLabel>Project Description</FormLabel>
      <Input onChange={(e) => setProject({...project, description: e.target.value })} color={'white'} my={'1.5'} type="text" />
    </FormControl>
    <form >
    <FormLabel>Project Document</FormLabel>
    <Input display={'flex'} justifyContent='align-items-center' type="file" onChange={(e) => sendFileToIPFS(e)} required />
    </form>
        <Select my={'1.5'} placeholder='Select project category'>
          <option onClick={(e) => setProject({...project, category: e.target.value })}  value='FOOD & HEALTHCARE'>FOOD & HEALTHCARE</option>
          <option onClick={(e) => setProject({...project, category: e.target.value })}  value='ENERGY & ENVIRONMENT'>ENERGY & ENVIRONMENT</option>
          <option onClick={(e) => setProject({...project, category: e.target.value })}  value='LOGISTICS & MOBILITY'>LOGISTICS & MOBILITY</option>
          <option onClick={(e) => setProject({...project, category: e.target.value })}   value='FINANCIAL INCLUSION'>FINANCIAL INCLUSION</option>
          <option onClick={(e) => setProject({...project, category: e.target.value })}  value='CREATIVE INDUSTRIES'>CREATIVE INDUSTRIES</option>
          <option onClick={(e) => setProject({...project, category: e.target.value })} value='SOCIAL & CIVIC TECH'>SOCIAL & CIVIC TECH</option>
        </Select>
        <Button onClick={postProject} mt='10'>Submit</Button>
    </Flex>
    )}

    </Flex>

    </Box>
  )
}

export default CreateProject