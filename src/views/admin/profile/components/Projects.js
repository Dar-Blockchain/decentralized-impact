// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
import { useEffect } from "react";
// Custom components
import axios from "axios";
import { useState, React } from "react";
import Card from "components/card/Card.js";
import Project from "views/admin/profile/components/Project";

export default function Projects(props) {
  // Chakra Color Mode
  const [projects, setProjects] = useState({name:'', desc:''});
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [loader, setLoader] = useState(true);
  const getProjects = async () => {
    const resp = await axios.get('http://localhost:3000/project/getprojects')  
    setProjects(resp.data.project)
    console.log(resp)
    setLoader(false)
  }
  useEffect(() => {
    if (loader === true){
    getProjects()
    }
    
}, [projects])

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        All projects
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Here you can find more details about your projects. Keep you user
        engaged by providing meaningful information.
      </Text>
      {loader === false && projects.map((value, index) => {
        return(
          <Project
          boxShadow={cardShadow}
          mb='20px'
          image={Project1}
          ranking={index + 1}
          link={'#'}
          title={value.title}
        />
        )
      })}
    </Card>
  );
}
