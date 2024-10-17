import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const JoinTeam = ({ onclose ,isdataUpdated }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [teamMembers, setTeamMembers] = useState('')

    const handleJoinTeam = async () => {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/team/join`,
            { teamName },
            { withCredentials: true }
        )
        isdataUpdated(true)
        if (response.data.statusCode == '200') {
            toast.success('Team joined successfully')
            onclose()
        } else {
            toast.error('Error joining team')
        }

      }
        const handleSubmit = (e) => {
            e.preventDefault()
            handleJoinTeam()
        }

     
        return (
            <div>
          
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center flex-row gap-2'>
                        <label>Team Name:</label>
                        <input
                            type='text'
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                            placeholder='Enter team name'
                            className='border p-2'
                        />
                    </div>
                    <Button type='submit' variant='contained'>
                        Join Team
                    </Button>
                </form>
            </div>
        )

}
export default JoinTeam
