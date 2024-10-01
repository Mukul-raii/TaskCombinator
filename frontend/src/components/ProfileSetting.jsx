import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function ProfileModal({ onClose, userdata }) {
    const [isEditing, setIsEditing] = useState(false)
    const [username, setUsername] = useState(' ')
    const [email, setEmail] = useState(' ')
    const fileInputRef = useRef(null)

console.log(userdata);


       const emailAdd = userdata.message?.user?.email || userdata.user?.email
       const user = userdata.message?.user?.userName || ' '
       const profilePic = userdata.message?.user?.photoURL || userdata.user?.photoURL
       useEffect(()=>{
           
           setEmail(emailAdd)
           setUsername(user)
        },[user,emailAdd])





    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log('File selected:', file.name)
        }
    }

    const handleSave = async () => {
        // Here you would typically save the changes
        console.log('Saving changes:', { username })
       
        const response = await axios.put('http://localhost:4000/api/v1/user/updateUser',{userName:username},{
            withCredentials: true
        })

        if(response.data.statusCode == "200"){
            toast.success('Profile updated successfully');
            setIsEditing(false)
        }else{
            toast.error('Error updating profile');
        }
    }

    return (
        <div className='bg-blue-50  rounded-3xl shadow-xl p-6 xs:max-md:p-4 xs:max-md:w-80 w-full  transform transition-all duration-300 ease-in-out'>
            <div className='relative mb-6'>
                <div className='w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-500'>
                    {profilePic && (
                        <img
                            src={profilePic || '/placeholder.svg?height=128&width=128'}
                            alt='Profile'
                            className='w-full h-full object-cover'
                        />
                    )}
                </div>
                <button
                    onClick={() => fileInputRef.current.click()}
                    className='absolute bottom-0 right-1/2 transform translate-x-16 translate-y-3 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                            fillRule='evenodd'
                            d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className='hidden'
                    accept='image/*'
                />
            </div>
            <div className='space-y-4'>
                <div>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-1'>
                        Username
                    </label>
                    {isEditing ? (
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    ) : (
                        <p className='text-lg font-semibold'>{username}</p>
                    )}
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </label>

                    <p className='text-gray-600'>{email}</p>
                </div>
            </div>
            <div className='mt-6 flex justify-end space-x-3'>
                {isEditing ? (
                    <>
                        <button
                            onClick={() => setIsEditing(false)}
                            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200'>
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200'>
                            Save
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200'>
                        Edit Profile
                    </button>
                )}
            </div>
            <button
                onClick={onClose}
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
            </button>
        </div>
    )
}
