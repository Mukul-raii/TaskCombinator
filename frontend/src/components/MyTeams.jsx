import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri'
const MyTeams = ({ getTeams }) => {
  const [teams, setTeams] = useState([]);

  // Fetch user teams from the API when component mounts
  useEffect(() => {
    const fetchUserTeams = async () => {
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getme`, {
          withCredentials: true
        });
        //console.log("getme",response.data);
        
        
        const teams = response.data.message.myteams;
  
        setTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchUserTeams();
  }, [setTeams]); // Empty dependency array ensures this runs only once on mount
  
  const deleteTeam =async (teamId)=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/team/delete`,{
      params:{teamId},
      withCredentials:true,
    })
   // console.log("delete team",response.data);
    if(response.data.statusCode==200){
   setTeams((prevTeams)=>prevTeams.filter((team)=>team.teamId !== teamId))
    }

  }

 
  const sendTeam = (teamId) => {
    getTeams(teamId); // Pass the teamId directly
  };

  return (
    
      <div className="flex flex-col text-xl text-black bg-blue-50 p-3 ">
        {teams.map((team, index) => (
          <div className=" hover:cursor-pointer p-2 flex flex-row justify-between" key={index}>
            <a 
              onClick={() => {
                sendTeam(team.teamId);
              }}>
              {team.teamName}
            </a>
          <RiDeleteBin6Line className=' hover:text-red-500 cursor-pointer' onClick={()=>deleteTeam(team.teamId)}/>
          </div>
        ))}
      </div>
    
  );
};

export default MyTeams;
