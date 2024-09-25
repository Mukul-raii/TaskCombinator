import React, { useState, useContext, useEffect } from 'react'
import NavBar from '../../src/components/navbar'
import { AuthContext } from '../../context/AuthContext'
import { Button, Modal, Box } from '@mui/material'
import CreateTeam from '../../src/components/CreateTeam'
import MyTeams from '../../src/components/MyTeams'
import { CardWithForm } from '../../src/components/task'
import axios from 'axios'
import CreateNewTask from '../../src/components/CreateNewTask'
import { set } from 'mongoose'
import JoinTeam from '../../src/components/JoinTeam'
import Dashboard from '../../src/components/dashboard'
const TaskManager = () => {
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [selectTeam, setSelectTeam] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [openTeamModal, setOpenTeamModal] = useState(false)
    const [openJoinTeamModal, setOpenJoinTeamModal] = useState(false)
    const [openTaskModal, setOpenTaskModal] = useState(false)
    const [taskData, setTaskData] = useState([])
const[teamName,setTeamName]=useState('')
    
    const handleOpenTeamModal = () => setOpenTeamModal(true)
    const handleCloseTeamModal = () => setOpenTeamModal(false)
    const handleOpenJoinTeamModal = () => setOpenJoinTeamModal(true)
    const handleCloseJoinTeamModal = () => setOpenJoinTeamModal(false)
    const handleOpenTaskModal = () => setOpenTaskModal(true)
    const handleCloseTaskModal = () => setOpenTaskModal(false)
    const{state}=useContext(AuthContext)

    console.log("state",state);
    console.log(state.user.name);
    
    const userName=state.user?.message?.user?.userName || state.user?.name
   

    function getTeams(id) {
        setSelectTeam(id)
    }


    useEffect(() => {
        const getTasks = async () => {
            console.log('select team ', selectTeam)

            try {
                const response = await axios.get('http://localhost:4000/api/v1/task/all', {
                    params: { teamId: selectTeam },
                    withCredentials: true
                })
                setIsAdmin(response.data.message.isAdmin)
                setTeamName(response.data.message.team.teamName)
                const response2 = await axios.get('http://localhost:4000/api/v1/team/getall', {
                    params: { teamId: selectTeam },
                    withCredentials: true
                })
                console.log((response2.data.message));
                
              setTaskData(response2.data.message)
            } catch (err) {
                console.error('Error getting tasks', err)
            } finally {
                setIsLoading(false)
            }
        }

        if (selectTeam) {
            getTasks()
        }
    }, [selectTeam])


    return (
        <>
            
            <NavBar />
            <div className='flex flex-row'>
                <nav className='bg-indigo-500 w-1/6 flex justify-start flex-col p-4 min-h-[calc(100vh-64px)]  grow '>
                    <Button variant='contained' onClick={handleOpenTeamModal}>
                        Create Team
                    </Button>
                    <Button variant='contained' onClick={handleOpenJoinTeamModal}>
                        Join Team
                    </Button>
                    <div className='p-2 mt-4  text-3xl text-white '>
                        <h1>My Teams</h1>
                    </div>
                    <MyTeams getTeams={getTeams} />
                </nav>
                <div className=' text-black font-extrabold w-full  bg-violet-300 min-h-[calc(100vh-64px)]'>
                    <div className='p-2 flex flex-row justify-between p-3 pb-0 min-w-full'>
                  {selectTeam &&  <h1 className='text-xl'>Welcome to {teamName}</h1>}
                  {!selectTeam && <h1 className='text-xl'>Welcome back {userName}</h1>}
                        {isAdmin && (
                            <button
                                onClick={handleOpenTaskModal}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                Add Task
                            </button>
                        )}
                    </div>
            
                    <div className='flex flex-wrap flex-row p-10 max-w-full gap-5 grow-0 '>
                        {!selectTeam && <Dashboard /> }

                        {taskData ? taskData.map((task, index) => <CardWithForm  task={task} teamId={selectTeam} key={index} />):<p>No Task Found</p>}
                    </div>
                </div>
            </div>
            <Modal open={openTeamModal} onClose={handleCloseTeamModal}>
                <Box sx={style}>
                    <CreateTeam />
                </Box>
            </Modal>
            <Modal open={openJoinTeamModal} onClose={handleCloseJoinTeamModal}>
                <Box sx={style}>
                    <JoinTeam />
                </Box>
            </Modal>
            <Modal open={openTaskModal} onClose={handleCloseTaskModal}>
                <Box sx={style}>
                    <CreateNewTask handleCloseTaskModal={handleCloseTaskModal} selectTeam={selectTeam} />
                </Box>
            </Modal>
        </>
    )
}

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
}

export default TaskManager
