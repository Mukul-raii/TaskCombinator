import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Herosection = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-row bg-gray-900 text-white  ">
        <div className="p-16 m-2  w-full  flex justify-evenly items-center flex-col h-auto ">
          <h1 className="text-6xl font-bold p-3">Effortlessly Create Teams and Assign Tasks</h1>
          <p className="text-md text-gray-300 px-3">
            Streamline your workflow by forming teams and delegating tasks efficiently. Empower your
            members to collaborate and achieve goals together.
          </p>
          <div className="flex justify-evenly p-3 pb-0  ">
            <div className=" p-3 ">
              <svg
                className="w-20  h-20 white"
                fill="white"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve">
                <g>
                  <g>
                    <path
                      d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                    />
                  </g>
                </g>
              </svg>
              <h1 className="text-xl   py-2 font-semibold">Team Building</h1>
              <p className="text-md  py-2  text-gray-300">
                Create dynamic teams that enhance productivity and foster collaboration.
              </p>
            </div>
            <div className=" p-3 pb-0">
              <svg
                className="w-20  h-20 white"
                fill="white"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve">
                <g>
                  <g>
                    <path
                      d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                    />
                  </g>
                </g>
              </svg>
              <h1 className="text-xl   py-2 font-semibold">Task Management</h1>
              <p className="text-md  py-2  text-gray-300">
                Assign tasks seamlessly and track progress in real-time.
              </p>
            </div>
          </div>
          <div className="w-full p-3 ">
            <Button className="text-2xl my-5 border p-2 bg-yellow-50 px-4 mt-8  rounded   text-black font-medium hover:bg-black hover:text-white ">
              <Link to={'/signin'}>Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="p-14 m-2 my-1  w-full  flex justify-evenly items-center ">
          <img
          className=' w-11/12 h-2/5'
            src="https://img.freepik.com/premium-vector/efficient-time-management-planning-concept-with-man-setting-tasks_1323048-1853.jpg?w=740"
            alt=""
            srcSet=""
          />
        </div>
      </div>

      
      
    </>
  );
};

export default Herosection;
