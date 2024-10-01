import { Button, Modal, Box } from '@mui/material'
import React, { useState, useRef, useEffect,useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileSetting'
import { AuthContext } from '../../context/AuthContext'

export default function UserProfileDropdown({ logoutme }) {
    const [isOpen, setIsOpen] = useState(false)
    const [openProfileModal, setOpenProfileModal] = useState(false)
    const dropdownRef = useRef(null)
    let userName = ''
    let email = ''

    // Use AuthContext to get user data
    const { state } = useContext(AuthContext);
    const userdata = state?.user;

    // Token, User and Profile Pic extraction
    const token = userdata?.message?.token || userdata?.token;
    const user = userdata?.message?.user || userdata?.name;
    const profilePic = userdata?.message?.user?.photoURL || userdata?.photoURL;


    if (typeof user === 'string') {
        email = user
        userName = user.split('@')[0]
    } else if (typeof user === 'object' && user !== null) {
        userName = user.userName || ''
        email = user.email || ''
    }

    const Font = userName.charAt(0).toUpperCase() || user.charAt(0).toUpperCase()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen)
    const navigate = useNavigate()
    return (
        <div
            className='relative border border-black p-1 w-40 xs:max-md:w-28  xs:max-md:m-4 xs:max-md:h-8  text-black rounded-xl'
            ref={dropdownRef}>
            <div className='flex flex-row justify-between items-center gap-2 '>
                <div className='flex justify-start flex-row'>
                    <div
                        onClick={() => navigate('/taskview')}
                        className='justify-center w-10 h-10 xs:max-md:h-6 xs:max-md:rounded-lg xs:max-md:w-6 bg-blue-500 cursor-pointer text-white rounded-xl flex items-center'>
                        {profilePic ? (
                            <img
                                src={profilePic || '/placeholder.svg?height=128&width=128'}
                                alt='Profile'
                                className='w-full h-full object-cover rounded-xl'
                            />
                        ) : (
                            <h1 className='font-black text-xl'>{Font}</h1>
                        )}
                    </div>
                    <h1 className=' p-1 font-semibold'>{userName.split(' ')[0]}</h1>
                </div>

                <button
                    onClick={toggleDropdown}
                    className='flex items-center space-x-2  '
                    aria-expanded={isOpen}
                    aria-haspopup='true'>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            isOpen ? 'transform rotate-180' : ''
                        }`}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white1 rounded-md shadow-lg py-1 ring-1 bg-white ring-black ring-opacity-5'>
                    <div className='px-4 py-2 text-sm text-gray-700 border-b border-gray-200'>
                        <p className='text-md text-gray-800'>{email}</p>
                    </div>
                    <a
                        onClick={() => setOpenProfileModal(true)}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Your Profile
                    </a>
                    <a href='#settings' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Settings
                    </a>
                    <a
                        href='#logout'
                        onClick={logoutme}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Sign out
                    </a>
                </div>
            )}
            <Modal open={openProfileModal}>
                <Box sx={style}>
                    <ProfileModal userdata={userdata} onClose={() => setOpenProfileModal(false)} />
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
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4
}
