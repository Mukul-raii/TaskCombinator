import React, { useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');

  const handleCreateTeam = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/team/create',
        { teamName, teamMembers },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success('Team created successfully');
      handleClose();
    } catch (error) {
      toast.error('Error creating team');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateTeam();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        <div>
          <label>Team Members:</label>
          <input
            type="text"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            placeholder="Enter team members"
            className="border p-2"
          />
        </div>
        <Button type="submit" variant="contained">
          Create Team
        </Button>
      </form>
    </div>
  );
};

export default CreateTeam;
