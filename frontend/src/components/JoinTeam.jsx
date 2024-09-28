import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect,useState } from 'react'

const JoinTeam = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState('');


const handleJoinTeam=async () => {
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/team/join`,{teamName},{withCredentials:true})
    console.log(response.data);
    
}

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinTeam();
      };
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            placeholder="Enter team name"
            className="border p-2"
          />
        </div>

        <Button type="submit" variant="contained">
          Join Team
        </Button>
      </form>

    </>
  )
}

export default JoinTeam


