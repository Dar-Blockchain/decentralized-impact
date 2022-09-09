import axios from 'axios';
import React, { useState } from 'react'

const CreateProject = () => {
    const [Project ,setProject] = useState({
        title: "",
        category: "blockchain",
        firstTeamMemberEmail: ["hello"],
        description: "",
        state: "test"
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
    <>

        <h1>Create Project</h1>
            <div class="mb-6">
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project title</label>
              <input onChange={handleTitleInputChange} name='title' id='title' value={Project.title} type={"text"} placeholder='Project Name' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Project category</label>

            
            <fieldset>


        <div class="flex items-center mb-4">
            <input id="checkbox-2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">blockchain</label>
        </div>

        <div class="flex items-center mb-4">
            <input id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">blockchain</label>
        </div>




        </fieldset>


            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <textarea onChange={handleDescriptionInputChange} id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project description"></textarea>

            <button onClick={submit} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Project</button>
    </>
      )
}

export default CreateProject