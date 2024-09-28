
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'animate.css';

export function DashboardCards({ task ,teamId,user}) {

    const {
        taskName, taskDescription, taskDueDate, taskPriority, taskStatus, assignTo ,teamName,_id
    } = task

    const userName = user.user?.message?.user?.userName || user.user?.name
    const userID = user.user?.message?.user?._id || user.user?.name

    
        const [status, setStatus] = useState(taskStatus)
        const [isUpdatedByClick, setIsUpdatedByClick] = useState(false)
        const [isLoading, setIsLoading] = useState(false)
 
        const [isHovered, setIsHovered] = useState(false);
   
        
        const statusColors = {
          'To Do': 'bg-yellow-100 text-yellow-800',
          'In Progress': 'bg-blue-100 text-blue-800',
          'Pending': 'bg-orange-100 text-orange-800',
          'Completed': 'bg-green-100 text-green-800'
        };
      
        const priorityColors = {
          'High': 'bg-red-200 text-red-800',
          'Medium': 'bg-orange-200 text-orange-800',
          'Low': 'bg-green-200 text-green-800'
        };

    useEffect(() => {
        
        const handleStatusChange = async () => {
            if (!isUpdatedByClick) return

            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/task/update/`,
                    { teamId, taskStatus: status, assignTo, taskID: _id },
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


    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
    }

    return (
   
     
  <div 
  className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <div className="p-6 space-y-4">
    <div className="flex justify-between items-start">
      <h2 className="text-xl font-bold text-gray-800 truncate group">
        {taskName}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
      </h2>
      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full animate-pulse">
        Due: {new Date(taskDueDate).toLocaleDateString()}
      </span>
    </div>
    
    <p className="text-sm text-gray-600 transition-all duration-300 ease-in-out" 
       style={{
         maxHeight: isHovered ? '100px' : '40px',
         overflow: 'hidden'
       }}>
      {taskDescription}
    </p>
    
    <div className="flex items-center space-x-2">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]} transition-all duration-300 ease-in-out transform hover:scale-105`}>
        {status}
      </span>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[taskPriority]} transition-all duration-300 ease-in-out transform hover:scale-105`}>
        {taskPriority}
      </span>
    </div>
    
    <div className="space-y-2 transition-all duration-300 ease-in-out" 
         style={{
           maxHeight: isHovered ? '200px' : '0px',
           opacity: isHovered ? 1 : 0,
           overflow: 'hidden'
         }}>
      <label htmlFor="status" className="block text-xs font-medium text-gray-700">
        Update Status
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue !== status) {
            setStatus(newValue);
          }
        }}
        disabled={userID !== assignTo}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-300 ease-in-out"
      >
        {userID === assignTo && (
          <>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </>
        )}
      </select>
    </div>
  </div>
  
  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
    <span className="text-xs font-medium text-gray-600">Assigned to: {userName}</span>
    <button
      type="button"
      onClick={handleUpdateClick}
      disabled={userID !== assignTo}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    >
      Update
    </button>
  </div>
</div>


   
    )
}

