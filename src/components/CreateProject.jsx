import axios from 'axios';
import React, { useState } from 'react'

const CreateProject = () => {
    const [Project ,setProject] = useState({
        title: "",
        category: "",
        firstTeamMemberEmail: ["hello"],
        description: "",
        state: ""
    })


    const handleTitleInputChange = (event) => {
    	event.persist();
    	setProject((Project) => ({
    		...Project,
    		title: event.target.value,
    	}));
    };
    const handleCategoryInputChange = (event) => {
    	event.persist();
    	setProject((Project) => ({
    		...Project,
    		category: event.target.value,
    	}));
    };
    const handleTeamMemberInputChange = (event) => {
    	event.persist();
    	setProject((Project) => ({
    		...Project,
    		firstTeamMemberEmail: event.target.value,
    	}));
    };


    // const handleTeamMemberInputChange = (event) => {
    //     const newMember = Project.firstTeamMemberEmail.slice();
    //     newMember.push(event.target.value);
    //     setProject(
    //         (Project) => ({
    //             ...Project, firstTeamMemberEmail: newMember}))
    //     }
    


    const handleDescriptionInputChange = (event) => {
    	event.persist();
    	setProject((Project) => ({
    		...Project,
    		description: event.target.value,
    	}));
    };
    const handleStateInputChange = (event) => {
    	event.persist();
    	setProject((Project) => ({
    		...Project,
    		state: event.target.value,
    	}));
    };


    const submit = () => {
        axios.post('https://decentralized-impact.alwaysdata.net/project/addproject', 
        {
            title: Project.title,
            category: Project.category,
            firstTeamMemberEmail:Project.firstTeamMemberEmail,
            description: Project.description,
            state: Project.state
        }
        ).then((res) =>{
            console.log(res)
        }).catch((err) => {console.error(err)})
    }
  return (
    <div className='addProjectContainer' >
        <h1>Create Project</h1>
        <input onChange={handleTitleInputChange} name='title' value={Project.title} type={"text"} placeholder='Project Name'  />
        <input onChange={handleCategoryInputChange} name='category' value={Project.category} type={"text"} placeholder='Project type' />
        <input onChange={handleDescriptionInputChange} name='description' value={Project.description}  type={"text"} placeholder='description' />
        {/* onChange={handleTeamMemberInputChange} value={Project.firstTeamMemberEmail}  */}
        <input  name='firstTeamMemberEmail'  type={'email'} placeholder="team member's email "/>
        <input onChange={handleStateInputChange} name='state'  value={Project.state}  type={"text"} placeholder='Location/State' />
        <button onClick={submit}>submit</button>
        </div>
  )
}

export default CreateProject