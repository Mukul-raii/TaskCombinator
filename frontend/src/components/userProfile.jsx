import React, { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function UserProfileDropdown({ logoutme,user }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
let userName = '';
let email = '';

if (typeof user === 'string') {
    email = user;
    userName = user.split('@')[0];
} else if (typeof user === 'object' && user !== null) {
    userName = user.userName || '';
    email = user.email || '';
}

const Font = userName.charAt(0).toUpperCase() || user.charAt(0).toUpperCase();
console.log(user);

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
        <div className='relative' ref={dropdownRef} >
            <button
                onClick={toggleDropdown}
                className='flex items-center space-x-2  focus:ring-blue-500 focus:ring-offset-2 rounded-full'
                aria-expanded={isOpen}
                aria-haspopup='true'>
                <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold'>
                  {Font}
                </div>
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

            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-indigo-500 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'>
                    <div className='px-4 py-2 text-sm text-gray-700 border-b border-gray-200'>
                        <p className='font-semibold'>{userName}</p>
                        <p className='text-xs text-gray-500'>{email}</p>
                    </div>
                    <a
                        onClick={() => navigate('/taskview')}
                        href='#profile'
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
        </div>
    )
}
