import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import { DashboardCards } from './dashboardtask'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
const[userTask,setUserTask]=useState([])
const{state}=useContext(AuthContext)



      useEffect(()=>{
        const getUserTasks=async () => {
            
            const response = await axios.get(`
              ${import.meta.env.VITE_API_URL}/task/UserTasks`
              ,{withCredentials:true})
      
            setUserTask(response.data.message.tasks)
            
        }
          getUserTasks()
      },[])



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6 gap-6 ">
        {userTask
        .filter((task)=>task.taskStatus!=="Completed")
        .map((task,index)=>(
 
        <div
        key={index}>
            <DashboardCards key={index} user={state} task={task} />

    </div>
         ))}

   </div>
  )
}

export default Dashboard
