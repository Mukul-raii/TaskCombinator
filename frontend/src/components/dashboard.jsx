import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import { DashboardCards } from './dashboardtask'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
const[userTask,setUserTask]=useState([])
const{state}=useContext(AuthContext)



      useEffect(()=>{
        const getUserTasks=async () => {
            
            const response = await axios.get('http://localhost:4000/api/v1/task/UserTasks',{withCredentials:true})
            console.log(response.data);
            setUserTask(response.data.message.tasks)
            
        }
          getUserTasks()
      },[])


  return (
    <div className='flex flex-wrap flex-row p-10 max-w-full  gap-5'>
        {userTask.map((task,index)=>(<DashboardCards key={index} user={state} task={task} /> ))}
    </div>
  )
}

export default Dashboard
