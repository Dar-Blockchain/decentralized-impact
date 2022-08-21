// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract test {
  
  
  enum ProjectStatus {On_hold, Published,Accepted,Refused , under_revision,selected}
  enum ProjectPhase{sourcing , catalyst,incubation}
   
   
   struct Project { 
      string name;
      string proposer;
      uint project_id ; 
      ProjectStatus status;
       ProjectPhase phase ; 
   }
   
    Project project;
constructor () public {
        project.project_id =1;
    }
   
  mapping(uint256 => Project) public Projects;
  
   uint  ProjectInfo ;
   
   
   function setProject( string memory name, string memory proposer)  public {
     
      Project storage curProject = Projects[ProjectInfo];
      curProject.name = name;
      curProject.proposer= proposer ;
      curProject.status=ProjectStatus.On_hold;
      curProject.phase=ProjectPhase.sourcing;
      curProject.project_id=1 ;
     
    }


   function getProjectId() public view returns (uint result) {
  
  result = project.project_id ;
      return project.project_id ;
   }
   
  
   function getProjectStatus(uint _ProposalID)
        public
        view
        returns (ProjectStatus)
        {


           return  Projects[_ProposalID].status;
        }

 function getProjectphase(uint _ProposalID)
        public view 
        returns ( ProjectPhase)
      {
         return Projects[_ProposalID].phase ;
      }

 function increament_number()public returns (uint){
     
project.project_id=project.project_id+1;

   }

}



