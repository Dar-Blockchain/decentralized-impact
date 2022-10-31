// Solidity program
// to store
// project Details
pragma solidity ^0.8.0;

// Creating a Smart Contract
contract projectInfo{

// Structure of project
    address owner;

    constructor() public{
    owner = msg.sender;
}
enum projectStatus {
    refused,
    accepted,
    catalyst,
    incubation
}
projectStatus public Status; 


struct project{
	
	// State variables
    address payable owner;
	uint projectId;
	string name;
	string category;
	string designation;
	projectStatus status;
}

mapping (uint => project) Project;


function changeStatus(projectStatus status, uint projectId) public {
    require (msg.sender == owner, "only owner");
    Project[projectId].status = status;
}

// Function to add
// project details
function addproject(
	uint projectId, 
    string memory name,
	string memory category,
	string memory designation
) public{
	project memory e;
    e.status = projectStatus.refused;
    e.category = category;
    e.designation = designation;
    e.name = name;
	Project[projectId] = e;
}
// Function to get
// details of project
function getproject(
	uint projectId
) public view returns(
	project memory){
    return Project[projectId]	;
	
	
	// If provided project
	// id is not present
	// it returns Not
	// Found

}
}