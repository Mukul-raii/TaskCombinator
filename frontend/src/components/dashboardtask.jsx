
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'animate.css';

export function DashboardCards({ task ,teamId,user}) {

    const {
        taskName, taskDescription, taskDueDate, taskPriority, taskStatus, assignTo ,teamName
    } = task
    
    const userName=user.user.message.user.userName
    console.log(userName);
    
    
 

    const [status, setStatus] = useState(taskStatus)
    const [isUpdatedByClick, setIsUpdatedByClick] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const handleStatusChange = async () => {
            if (!isUpdatedByClick) return

            try {
                const response = await axios.put(
                    `http://localhost:4000/api/v1/task/update/`,
                    { teamId, taskStatus: status, assignTo, taskId: _id },
                    {
                        withCredentials: true
                    }
                )
                console.log('Update sent: ', response.data)
            } catch (error) {
                console.error('Error updating status:', error)
            } finally {
                setIsUpdatedByClick(false)
            }
        }

        if (isUpdatedByClick) {
            handleStatusChange()
        }
    }, [status, taskStatus, teamId, assignTo, isUpdatedByClick])

    const handleUpdateClick = () => {
        setIsUpdatedByClick(true)
        setStatus(status)
    }

    const statusOptions = ['To Do', 'In Progress', 'Done', 'Pending']
    const statusColors = {
        Pending: 'bg-gray-200 text-red-800',
        'To Do': 'bg-yellow-200 text-yellow-800',
        'In Progress': 'bg-blue-200 text-blue-800',
        Done: 'bg-green-200 text-green-800'
    }

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
    }

    return (
   
            <div className='w-[350px] bg-fuchsia-200 h-[380px]  bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-spacing-y-52 hover:shadow-2xl'>
                <div className='p-5 space-y-3'>
                    <h2 className='text-xl font-bold flex justify-between text-gray-800 truncate'>
                        {taskName}
                        <span className='text-xs p-2 text-gray-500'>
                            Due: {new Date(taskDueDate).toLocaleDateString()}
                        </span>
                    </h2>
                    <p className='text-sm text-gray-600 line-clamp-2'>{taskDescription}</p>
                    <div className='flex items-center justify-between'>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[taskStatus]}`}>
                             {taskStatus} 
                        </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <span className='text-xs font-semibold text-gray-700'>Priority:</span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                taskPriority === 'High'
                                    ? 'bg-red-200 text-red-800'
                                    : taskPriority === 'Medium'
                                      ? 'bg-orange-200 text-orange-800'
                                      : 'bg-green-200 text-green-800'
                            }`}>
                            {taskPriority}
                        </span>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
                            Update Status
                        </label>
                        <select
                            id='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='px-5 py-3  bg-fuchsia-200 flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>Assigned to: {userName}</span>
                    <button
                        type='button'
                        onClick={handleUpdateClick}
                        className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        Update
                    </button>
                </div>
            </div>
   
    )
}
