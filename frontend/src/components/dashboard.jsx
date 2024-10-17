import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { DashboardCards } from './dashboardtask'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { set } from 'mongoose'

const Dashboard = () => {
    const [userTask, setUserTask] = useState([])
    const { state } = useContext(AuthContext)

    const [isUpdatedByClick, setIsUpdatedByClick] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getUserTasks = async () => {
            try {
                const response = await axios.get(` ${import.meta.env.VITE_API_URL}/task/UserTasks`, {
                    withCredentials: true
                })
                setUserTask(response.data.message.tasks)
            } catch (error) {
                console.error('Error fetching user tasks:', error)
            } finally {
                setIsLoading(false)
            }
        }
        getUserTasks()
    }, [userTask, setUserTask])

    const setUpdate = () => {
        setIsUpdatedByClick(true)
    }

    const cardUpdate = async (taskID, newStatus, teamId, assignTo) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/task/update/`,
                { teamId, taskStatus: newStatus, assignTo, taskID },
                {
                    withCredentials: true
                }
            )
            const index = userTask.findIndex((task) => task._id == taskID)
            const tempdata = userTask
            tempdata[index] = response.data.message
            setIsLoading(true)
            setUserTask(tempdata)
            if (response.statusCode === 200) {
                toast.success('Task Updated Successfully')
            } else {
                toast.error('Task Not Updated')
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 gap-6 '>
            {userTask
                .filter((task) => task.taskStatus !== 'Completed')
                .map((task, index) => (
                    <div key={index}>
                        <DashboardCards
                            key={index}
                            user={state}
                            task={task}
                            cardUpdate={cardUpdate}
                            setUpdate={setUpdate}
                        />
                    </div>
                ))}
        </div>
    )
}

export default Dashboard
