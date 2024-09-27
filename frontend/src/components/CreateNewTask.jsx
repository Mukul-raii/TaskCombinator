import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateNewTask = ({selectTeam }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [teamMember, setTeamMember] = useState({});

  useEffect(() => {

  setIsLoading(true)
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/team/getall', {
          withCredentials: true,
          params: { teamId: selectTeam }
        });
       
        console.log("teamdeta",response.data.message.teamMembers);
        
        setTeamMember(response.data.message.teamMembers);
      setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/task/create',
        {
          taskName,
          taskDescription,
          taskDueDate,
          taskPriority,
          assignTo,
          teamId: selectTeam,
          taskStatus: 'Pending'
        },
        { withCredentials: true }
      );
     console.log(response.data);
     
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Error creating task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateTask();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto  mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            onChange={(e) => setTaskName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label  htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            onChange={(e) => setTaskDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={3}
            required></textarea>
        </div>

        <div>
          <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="taskDueDate"
            onChange={(e) => setTaskDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="taskPriority"
            onChange={(e) => setTaskPriority(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required>
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            id="assignTo"
            onChange={(e) => setAssignTo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required>
           <option value="">Select a team member</option>
            {teamMember && Object.entries(teamMember).map(([id, member]) => (
              <option key={id} value={member._id}>
                {member.userName}
              </option>
            ))}
            
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateNewTask;

// To implement user selection from an array, you can replace the "Assign To" input field with a select dropdown:
/*
const [users, setUsers] = useState([]) // Assume this is populated with user data

<div>
  <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">Assign To</label>
  <select
    id="assignTo"
    onChange={(e) => setAssignTo(e.target.value)}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    required
  >
    <option value="">Select user</option>
    {users.map((user) => (
      <option key={user.id} value={user.id}>{user.name}</option>
    ))}
  </select>
</div>
*/
