import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyTeams = ({ getTeams }) => {
  const [teams, setTeams] = useState([]);

  // Fetch user teams from the API when component mounts
  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/getme', {
          withCredentials: true
        });
        
        const teams = response.data.message.myteams;
        console.log(teams);
        setTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchUserTeams();
  }, [setTeams]); // Empty dependency array ensures this runs only once on mount

  // Send the selected team to parent component directly from the click event
  const sendTeam = (teamId) => {
    getTeams(teamId); // Pass the teamId directly
  };

  return (
    <div>
      <div className="flex flex-col text-white text-xl">
        {teams.map((team, index) => (
          <div className="hover:text-white hover:cursor-pointer" key={index}>
            <a
              onClick={() => {
                sendTeam(team.teamId);
              }}>
              {team.teamName}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeams;
