// Solidity program
// to store
// project Details
pragma solidity ^0.8.0;

// Creating a Smart Contract
contract projectInfo{

// Structure of project
struct project{
	
	// State variables
	int projectId;
	string name;
	string category;
	string designation;
}

project []proj;

// Function to add
// project details
function addproject(
	int projectId, string memory name,
	string memory category,
	string memory designation
) public{
	project memory e
		=project(projectId,
				name,
				category,
				designation);
	proj.push(e);
}

// Function to get
// details of project
function getproject(
	int projectId
) public view returns(
	string memory,
	string memory,
	string memory){
	uint i;
	for(i=0;i<proj.length;i++)
	{
		project memory e
			=proj[i];
		
		// Looks for a matching
		// project id
		if(e.projectId==projectId)
		{
				return(e.name,
					e.category,
					e.designation);
		}
	}
	
	// If provided project
	// id is not present
	// it returns Not
	// Found
	return("Not Found",
			"Not Found",
			"Not Found");
}
}
