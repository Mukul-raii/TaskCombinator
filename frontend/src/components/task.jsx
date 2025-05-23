import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { RiDeleteBin2Fill } from 'react-icons/ri'
export function CardWithForm({ task, teamId,cardUpdate,setUpdate }) {
    const {
        _id: taskID,
        taskName,
        taskDescription,
        taskDueDate,
        taskPriority,
        taskStatus,
        assignTo,

        assignedTo: { userId: assignToID, userName, email }
    } = task

    if (!task.taskName) {
        return <div>Loading...</div>
    }
    const [status, setStatus] = useState(taskStatus)
    const [isUpdatedByClick, setIsUpdatedByClick] = useState(false)
    const [assignedMember, setAssignedMember] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
const [newStatus, setNewStatus] = useState(taskStatus)
    const { state } = useContext(AuthContext)


    const userID = state?.user?.message?.user?._id

    useEffect(() => {
        if (isUpdatedByClick) {
            console.log("pending1")

            setUpdate()
            cardUpdate(taskID, newStatus,teamId,assignTo)
        }
    }, [isUpdatedByClick])

    
    const handleUpdateClick = () => {
        setIsUpdatedByClick(true)
        setNewStatus(newStatus)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/task/delete`, {
                params: { taskId: taskID },
                withCredentials: true
            })
            if (response.data.statusCode == '200') {
                toast.success('Success fully deleted task ')
            } else {
                toast.error('Only admin can  delete task')
            }
            
        } catch (error) {
            toast.error('Error deleting error')
        }
    }

    const statusColors = {
        'To Do': 'bg-yellow-100 text-yellow-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        Pending: 'bg-orange-100 text-orange-800',
        Completed: 'bg-green-100 text-green-800'
    }

    const priorityColors = {
        High: 'bg-red-200 text-red-800',
        Medium: 'bg-orange-200 text-orange-800',
        Low: 'bg-green-200 text-green-800'
    }
    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
    }

    return (
        <div
            className='w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1'
            onMouseEnter={() => setIsHovered(true) }
            onMouseLeave={() => setIsHovered(false)}>
            <div className='p-6 space-y-4'>
                <div className='flex justify-between items-start'>
                <h2 className= {`text-xl font-bold w-3/5  text-gray-800  group   ${isHovered ? '' : 'truncate'} `}
                     >
                        {taskName}
                        <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600'></span>
                    </h2>
                    <span className='text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full animate-pulse'>
                        Due: {new Date(taskDueDate).toLocaleDateString()}
                    </span>
                </div>

                <p
                    className={`text-sm text-gray-600 transition-all duration-300 ease-in-out group ${isHovered ? '' : 'truncate'}`}
                    style={{
                        maxHeight: isHovered ? 'none' : '40px',
                        overflow: isHovered ? 'visible' : 'hidden' 
                    }}>
                    {taskDescription}
                </p>

                <div className='flex items-center space-x-2'>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]} transition-all duration-300 ease-in-out transform hover:scale-105`}>
                        {status}
                    </span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[taskPriority]} transition-all duration-300 ease-in-out transform hover:scale-105`}>
                        {taskPriority}
                    </span>
                </div>

                <div
                    className='space-y-2 transition-all duration-300 ease-in-out'
                    style={{
                        maxHeight: isHovered ? '200px' : '0px',
                        opacity: isHovered ? 1 : 0,
                        overflow: 'hidden'
                    }}>
                    <label htmlFor='status' className='block text-xs font-medium text-gray-700'>
                        Update Status
                    </label>
                    <select
                        id='status'
                        value={newStatus}
                        onChange={(e) => {
                            const newValue = e.target.value
                            if (newValue !== status) {
                               setNewStatus(newValue)
                            
                            }
                        }}
                        disabled={userID !== assignToID}
                        className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-300 ease-in-out'>
                        {userID === assignToID ? (
                            <>
                                <option value='To Do'>To Do</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Pending'>Pending</option>
                                <option value='Completed'>Completed</option>
                            </>
                        ) : (
                            <option value=''>You are not assigned</option>
                        )}
                    </select>
                </div>
            </div>

            <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center'>
                <span className='text-xs font-medium text-gray-600'>Assigned to: {userName}</span>
                <div className='flex flex-row gap-2 items-center justify-between  '>
                    <RiDeleteBin2Fill
                        className=' text-red-700 text-2xl hover:scale-150 transition-all duration-300 ease-in-out'
                        onClick={() => handleDelete()}
                    />
                    <button
                        type='button'
                        onClick={handleUpdateClick}
                        disabled={userID !== assignToID}
                        className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95'>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
