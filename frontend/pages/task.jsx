import React, { useState, useContext, useEffect } from 'react';
import NavBar from '../src/components/navbar';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateTeam from '../src/components/CreateTeam'; // Import your CreateTeam component
import MyTeams from '../src/components/MyTeams';
import { CardWithForm } from '../src/components/task';
import axios from 'axios';
const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectTeam, setSelectTeam] = useState(null);
  const [open, setOpen] = useState(false); // State to control modal open/close
  const [isAdmin, setIsAdmin] = useState(false);
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function getTeams(data) {
    console.log(data);

    setSelectTeam(data);
  }
  useEffect(() => {
    const getTasks = async () => {
      console.log('select team ', selectTeam);

      try {
        const response = await axios.get('http://localhost:4000/api/v1/task/all', {
          params: { teamId: selectTeam },
          withCredentials: true
        });
        console.log(response.data);

        setIsAdmin(response.data.message.isAdmin);
      } catch (err) {
        console.error('Error getting tasks', err);
      }
    };

    if (selectTeam) {
      getTasks();
    }
  }, [selectTeam]);

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <nav className="bg-gray-800 w-1/6 max-h-screen h-screen ">
          <Button variant="contained" onClick={handleOpen}>
            Create Team
          </Button>
          <div className="p-2">
            <h1>My Teams</h1>
          </div>
          <MyTeams getTeams={getTeams} />
        </nav>
        <div className=" text-black font-extrabold">
          {isAdmin?<button>Add Task</button>:null}
          <CardWithForm />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateTeam />
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default TaskManager;
