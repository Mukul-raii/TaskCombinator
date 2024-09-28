import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './Herosection.css'
import Footbar from '../footbar'

const Herosection = () => {
    return (
        <>
            <div className='h-screen hero-background flex  justify-start  flex-col '>
                <div className='h-32'></div>
                <div className=' flex justify-center items-center    '>
                    <p className=' w-fit p-2 px-4 border border-black text-neutral-800 font-semibold  rounded-full '>
                        Streamline. Prioritize. Conquer.
                    </p>
                </div>
                <div className='flex justify-center items-start flex-row text-black  '>
                    <div className='w-full  flex justify-evenly xs:max-md:justify-center xs:max-md:p-2 items-center flex-col h-auto '>
                        <div className=' xs:max-md:justify-center xs:max-md:text-center xs:max-md:items-center '>
                            <h1 className='text-5xl xs:max-md:text-3xl font-bold xs:max-md:pb-1 p-3'>
                                TaskCombinator – Effortlessly Combine Your Tasks,{' '}
                            </h1>
                            <h1 className='text-5xl xs:max-md:text-3xl font-bold xs:max-md:pt-0 p-3'>
                                and Unlock Your True Potential.
                            </h1>
                        </div>
                        <div>
                            <p className='text-lg xs:max-md:text-md xs:max-md:px-1  text-stone-600 px-3'>
                                Streamline your workflow by forming teams and delegating tasks efficiently.
                            </p>
                            <p className='text-lg  xs:max-md:px-1  text-stone-600 px-3'>
                                Empower your members to collaborate and achieve goals together.
                            </p>
                        </div>

                        <div className='flex justify-center items-center  p-8  '>
                            <div className=' p-3  '>
                                <svg
                                    className='w-20 xs:max-md:w-10 xs:max-md:h-10 h-20 white fill-sky-800'
                                    fill='black'
                                    height='800px'
                                    width='800px'
                                    version='1.1'
                                    id='Layer_1'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    viewBox='0 0 512 512'
                                    xmlSpace='preserve'>
                                    <g>
                                        <g>
                                            <path
                                                d='M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z'
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <h1 className='text-xl  xs:max-md:text-sm xs:max-md:w-28  py-2 font-semibold'>
                                    Team Building
                                </h1>
                                <p className='text-md  py-2  text-stone-600'>
                                    Create dynamic teams that enhance productivity and foster collaboration.
                                </p>
                            </div>
                            <div className=' p-3 '>
                                <svg
                                    className='w-20 max-md:w-10 xs:max-md:h-10  h-20 white fill-sky-800'
                                    fill='white'
                                    height='800px'
                                    width='800px'
                                    version='1.1'
                                    id='Layer_1'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    viewBox='0 0 512 512'
                                    xmlSpace='preserve'>
                                    <g>
                                        <g>
                                            <path
                                                d='M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z'
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <h1 className='text-xl xs:max-md:text-sm xs:max-md:w-28   py-2 font-semibold'>
                                    Task Management
                                </h1>
                                <p className='text-md  py-2  text-stone-600'>
                                    Assign tasks seamlessly and track progress in real-time.
                                </p>
                            </div>
                        </div>
                        <div className='w-full p-3 flex justify-center'>
                            <Button className='!px-6 !py-2 border border-2 !bg-blue-500 !text-white rounded-md  '>
                                <Link to='/signin'>Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[810px]  xs:max-md:h-56  w-full flex justify-center   HeroImage'>
                <div className='h-[810px] xs:max-md:h-56 bg-opacity-50 w-[90%] mt-[-100px] xs:max-md:mt-[-40px] rounded-3xl p-8 xs:max-md:p-4 backdrop-blur-lg HeroImage2 transform transition-all duration-300 hover:scale-105'>
                    <img
                        className='rounded-3xl transform transition-all duration-300  hover:scale-100'
                        src='https://res.cloudinary.com/dmvzjbgwp/image/upload/v1727458714/s8zxfnhpvro1n4rcmtv5.png'
                    />
                </div>
            </div>
            <div className=' px-4 h-[600px] xs:max-md:h-[1100px] flex justify-center items-center p-24  xs:max-md:p-14   flex-col gap-2 '>
                <h2 className='text-3xl font-semibold text-center mb-2'>Features</h2>
                <div className='grid grid-cols-1 xs:max-md:grid-cols-1  lg:grid-cols-3 p-16 xs:max-md:p-2 xs:max-md:gap-6 gap-10'>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Smart Task Management</h3>
                        <p className='xs:max-md:text-xs'>
                            Organize tasks efficiently with drag-and-drop features and easy task prioritization.
                        </p>
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Cross-Platform Sync</h3>
                        <p className='xs:max-md:text-xs'>
                            Sync your tasks across all devices to keep your to-dos in check wherever you are.
                        </p>
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Multiple User Support</h3>
                        <p className='xs:max-md:text-xs'>
                            Manage tasks for multiple users, ideal for teams or families.
                        </p>
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Great UX & UI</h3>
                        <p className='xs:max-md:text-xs'>
                            Enjoy a clean, modern design with an intuitive and user-friendly interface.
                        </p>
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Personalized Dashboard</h3>
                        <p className='xs:max-md:text-xs'>
                            Track your progress with a personalized dashboard displaying task completion stats.
                        </p>
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-5 text-left '>
                        <h3 className='text-xl xs:max-md:text-s xs:max-md:p-2 font-semibold'>Due Date Tracking</h3>
                        <p className='xs:max-md:text-xs'>
                            Never miss a deadline with clear tracking of due dates and reminders.
                        </p>
                    </div>
                </div>
            </div>
            <Footbar />
        </>
    )
}

export default Herosection
