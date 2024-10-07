import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import NavBar from '../../src/components/navbar'
import MyTeams from '../../src/components/MyTeams'
import { CardWithForm } from '../../src/components/task'
import CreateTeam from '../../src/components/CreateTeam'
import JoinTeam from '../../src/components/JoinTeam'
import CreateNewTask from '../../src/components/CreateNewTask'
import Dashboard from '../../src/components/dashboard'
import { Button, Modal, Box } from '@mui/material'
import { FaBars, FaPlus, FaGithub, FaTwitter } from 'react-icons/fa'
const TaskManager = () => {
    const { state } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [selectTeam, setSelectTeam] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [openTeamModal, setOpenTeamModal] = useState(false)
    const [openJoinTeamModal, setOpenJoinTeamModal] = useState(false)
    const [openTaskModal, setOpenTaskModal] = useState(false)
    const [taskData, setTaskData] = useState([])
    const [teamdata, setTeamdata] = useState([])
    const [teamName, setTeamName] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false) // State for toggling the sidebar
    const navigate = useNavigate()
    const [userTask, setUserTask] = useState([])

    const userName = state.user?.message?.user?.userName || state.user?.name

    const handleOpenTeamModal = () => setOpenTeamModal(true)
    const handleCloseTeamModal = () => setOpenTeamModal(false)

    const handleOpenJoinTeamModal = () => setOpenJoinTeamModal(true)
    const handleCloseJoinTeamModal = () => setOpenJoinTeamModal(false)

    const handleOpenTaskModal = () => setOpenTaskModal(true)
    const handleCloseTaskModal = () => setOpenTaskModal(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen) // Toggle the sidebar state
    }

    function getTeams(id) {
        setSelectTeam(id)
        setIsLoading(true)

        if (taskData.length > 0) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const getTasks = async () => {
            const token = localStorage.getItem('token') // Retrieve the token from storage (or where you're storing it)

            try {
                // First API call
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/task/all`, {
                    params: { teamId: selectTeam },
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token here
                    },
                    withCredentials: true
                })

                setIsAdmin(response.data.message.isAdmin)
                setTeamName(response.data.message.team.teamName)

                // Second API call
                const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/team/getall`, {
                    params: { teamId: selectTeam },
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token here
                    },
                    withCredentials: true
                })

                setTeamdata(response2.data.message)
                setTaskData(response2.data.message.tasks)
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
        <div className='min-h-screen bg-gray-100'>
            <NavBar />
            <div className='flex'>
                <nav
                    className={`bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-64 3xl:w-80 min-h-screen fixed left-0 top-16 transform transition-transform duration-300 z-50 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-lg`}>
                    <button
                        className='text-white xs:max-md:h-10 xs:max-md:w-8 items bg-blue-600 p-2 m-2 rounded-md md:hidden'
                        onClick={toggleSidebar}>
                        {sidebarOpen ? <FaBars /> : <FaBars />}
                    </button>
                    <div className='p-6 space-y-6'>
                        <h2 className='text-2xl font-bold text-center mb-6 bg-white text-blue-600 py-2 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105'>
                            My Teams
                        </h2>
                        <div className='relative pl-4'>
                            <div className='absolute left-0 top-0 h-full w-0.5 bg-white opacity-50'></div>
                            <MyTeams getTeams={getTeams} />
                        </div>
                        <button
                            className='w-full p-3 bg-white text-blue-600 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                            onClick={() => {
                                setSelectTeam('')
                                navigate('/taskview')
                            }}>
                            <h1 className='text-xl font-bold'>Pending Tasks</h1>
                        </button>
                    </div>
                    <div className='absolute bottom-32 left-0 right-0 px-6 space-y-4'>
                        <Button
                            className='w-full px-6 py-3 !bg-white text-blue-600 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                            onClick={handleOpenTeamModal}>
                            Create Team
                        </Button>
                        <Button
                            className='w-full px-6 py-3 !bg-white text-blue-600 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                            onClick={handleOpenJoinTeamModal}>
                            Join Team
                        </Button>
                    </div>
                    <div className='absolute bottom-16 flex text-sm justify-center space-x-4 left-0 right-0 py-4'>
                        {/* Twitter Button */}
                        <a href='https://x.com/nobita_3127' target='_blank' rel='noopener noreferrer'>
                            <button className='w-28 h-fit flex items-center border border-white px-2 py-1 rounded-xl hover:bg-white hover:text-black transition-all'>
                                <FaTwitter className='mr-2' />
                                <p>Twitter</p>
                            </button>
                        </a>

                        {/* GitHub Button */}
                        <a href='https://github.com/Mukul-raii' target='_blank' rel='noopener noreferrer'>
                            <button className='w-28 h-fit flex items-center border border-white px-2 py-1 rounded-xl hover:bg-white hover:text-black transition-all'>
                                <FaGithub className='mr-2' />
                                <p>Source</p>
                            </button>
                        </a>
                    </div>
                </nav>

                {/* Main Content */}
                <main className='flex-1 ml-0 md:ml-64 3xl:ml-80 p-8 transition-all duration-300 ease-in-out'>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-8 mt-[60px]'>
                        <div className='flex justify-between w- xs:max-md:justify-start flex-row items-center'>
                            <button
                                className='text-white xs:max-md:h-10 xs:max-md:w-8 items bg-blue-600 p-2 m-2 rounded-md md:hidden'
                                onClick={toggleSidebar}>
                                {sidebarOpen ? <FaBars /> : <FaBars />}
                            </button>
                            <h1 className='text-3xl xs:max-md:text-xl font-bold text-gray-800'>
                                {selectTeam ? `Welcome ${userName} to ${teamName} 🤩` : `Welcome back ${userName} 🤩`}
                            </h1>
                            {isAdmin && (
                                <button
                                    onClick={handleOpenTaskModal}
                                    className='bg-blue-500 hover:bg-blue-600 h-14 xs:max-md:h-10 xs:max-md:w-10 xs:max-md:text-lg xs:max-md:text-center xs:max-md:p-2 rounded-full text-white text-2xl font-bold py-2 px-4 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                                    <FaPlus />
                                </button>
                            )}
                        </div>
                    </div>
                    <>
                        <div className=' flex justify-center items-center '>
                            {isLoading ? (
                                <div className='flex justify-center items-center h-64'>
                                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
                                </div>
                            ) : !selectTeam ? (
                                <Dashboard />
                            ) : taskData && taskData.length > 1 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                    {taskData
                                        .filter((task) => task.taskStatus !== 'Completed')
                                        .map((task, index) => (
                                            <div
                                                key={index}
                                                className='transform transition-all duration-300 hover:scale-105'>
                                                <CardWithForm task={task} teamId={selectTeam} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className='text-center text-gray-600 font-medium'>
                                    <p className='text-2xl mb-2'>No Active Tasks!</p>
                                    <p className='text-xl'>Do whatever you like to do 🥳</p>
                                </div>
                            )}
                        </div>
                    </>
                </main>
            </div>

            <Modal open={openTeamModal} onClose={handleCloseTeamModal}>
                <Box sx={style}>
                    <CreateTeam onClose={handleCloseTeamModal} />
                </Box>
            </Modal>
            <Modal open={openJoinTeamModal} onClose={handleCloseJoinTeamModal}>
                <Box sx={style}>
                    <JoinTeam onclose={handleCloseJoinTeamModal} />
                </Box>
            </Modal>
            <Modal open={openTaskModal} onClose={handleCloseTaskModal}>
                <Box sx={style}>
                    <CreateNewTask onclose={handleCloseTaskModal} selectTeam={selectTeam} />
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    display: 'flex',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4
}

export default TaskManager
